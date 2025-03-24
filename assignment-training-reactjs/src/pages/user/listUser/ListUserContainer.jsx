import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ListUsers from './ListUsers';
import ToolbarActionsSearch from '../../../components/sidebar/ToolbarActionsSearch';
import {
  Button,
  FormControl,
  Modal,
  NativeSelect,
  Paper,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { UserService } from './../../../api/apiService/UserService';
import { jwtDecode } from 'jwt-decode';
import { role } from '../../../constants/enum';
import ModalConsentient from '../../../components/modal/ModalConsentient';
import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
import { VALIDATE_CODES } from '../../../constants/validateCode';
import UpdateUserContainer from '../updateUsers/UpdateUserContainer';
import { useTranslation } from 'react-i18next';
import { useSearch } from './../../../hooks/useSearch';

const fetchUsers = async (searchValue, page, rowsPerPage, sortName, direction) => {
  try {
    const requestBody = {
      userName: searchValue.userName ?? '',
      fullName: searchValue.fullName ?? '',
      role: searchValue.role ?? '',
    };

    const response = await UserService.listUser(
      requestBody,
      page + 1,
      rowsPerPage,
      sortName,
      direction,
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API tìm kiếm người dùng:', error);
    throw error;
  }
};

const ListUserContainer = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: null, name: null });
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { showError, showSuccess } = useErrorAndSuccess();
  const [sortConfig, setSortConfig] = useState({
    key: 'fullName',
    direction: 'ASC',
  });

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { searchValue, handleTempSearchChange, handleSearch, tempSearchValue } = useSearch();

  const columns = [
    { id: 'fullName', label: t('tableContainer.fullName'), minWidth: 150, sortable: true },
    { id: 'userName', label: t('tableContainer.userName'), minWidth: 150, sortable: true },
    { id: 'email', label: t('tableContainer.email'), minWidth: 170, sortable: true },
    {
      id: 'dob',
      label: t('tableContainer.birthday'),
      minWidth: 100,
      align: 'center',
      sortable: true,
    },
    { id: 'role', label: t('tableContainer.role'), minWidth: 150, align: 'center' },
    { id: 'actions', label: t('tableContainer.action'), minWidth: 200, align: 'center' },
  ];

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const currentUserRole = decoded.data.role;
  const currentUserId = decoded.data._id;

  const openModalUpdate = (id) => {
    setSelectedUser({ id });
    setOpenUpdateModal(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenUpdateModal(false);
  };

  const openModalDelete = (id, name) => {
    setSelectedUser({ id, name });
    setOpenDeleteModal(true);
  };

  const handleCloseModalDelete = () => {
    setOpenDeleteModal(false);
  };

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id) => {
      await UserService.deleteUser({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showSuccess(VALIDATE_CODES.I0001);
      setOpenDeleteModal(false);
      setSelectedUser({ id: '', name: '' });
    },
    onError: (error) => {
      showError(error.response.data.message);
      console.error('Lỗi khi xóa người dùng:', error);
    },
  });

  const confirmDelete = () => {
    if (!selectedUser.id) return;
    deleteUser(selectedUser.id);

    setOpenDeleteModal(false);
    setSelectedUser({ id: '', name: '' });
  };

  const { data: dataUsers, isLoading } = useQuery({
    queryKey: ['users', searchValue, page, rowsPerPage, sortConfig.key, sortConfig.direction],
    queryFn: () => fetchUsers(searchValue, page, rowsPerPage, sortConfig.key, sortConfig.direction),
    keepPreviousData: true,
  });

  const formattedRows = (dataUsers?.data?.docs || [])
    .filter((row) => row._id !== currentUserId)
    .map((row) => ({
      ...row,
      dob: row.dob ? new Date(row.dob).toLocaleDateString('vi-VN') : '',
      role: Number(row.role) === role.ADMIN ? 'Admin' : 'User',
    }));

  const rows = dataUsers?.data?.docs?.length || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };
  return (
    <div className="mt-10">
      <form className="flex justify-between items-center" onSubmit={handleSearch}>
        <ToolbarActionsSearch
          onChange={(e) => {
            handleTempSearchChange('userName', e.target.value);
          }}
          label={t('searchContainer.searchByUserName')}
          value={tempSearchValue.userName}
        />
        <ToolbarActionsSearch
          onChange={(e) => {
            handleTempSearchChange('fullName', e.target.value);
          }}
          label={t('searchContainer.searchByFullName')}
          value={tempSearchValue.fullName}
        />

        <FormControl sx={{ width: '200px', height: '40px' }}>
          <NativeSelect
            disableUnderline
            value={tempSearchValue.role}
            onChange={(e) => handleTempSearchChange('role', e.target.value)}
            sx={{
              width: '100%',
              height: '100%',
              border: '1px solid #ccc',
              outline: 'none',
              padding: '0 10px',
              fontSize: '14px',
              borderRadius: '15px',
            }}
          >
            <option value="">{t('searchContainer.all')}</option>
            <option value={role.ADMIN}>{t('searchContainer.admin')}</option>
            <option value={role.USER}>{t('searchContainer.user')}</option>
          </NativeSelect>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {t('searchContainer.buttonSearch')}
        </Button>
      </form>

      <Paper elevation={0} sx={{ mt: 5, width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }} className="flow">
          <ListUsers
            columns={columns}
            rows={isLoading ? [] : formattedRows}
            page={page}
            rowsPerPage={rowsPerPage}
            currentUserRole={currentUserRole}
            handleUpdate={openModalUpdate}
            handleDelete={openModalDelete}
            handleName={selectedUser.name}
            sortConfig={sortConfig}
            onSort={handleSort}
            isLoading={isLoading}
          />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal open={openUpdateModal} onClose={handleCloseModalUpdate}>
        <UpdateUserContainer onclose={handleCloseModalUpdate} id={selectedUser.id} />
      </Modal>

      <ModalConsentient
        open={openDeleteModal}
        onClose={handleCloseModalDelete}
        onDelete={confirmDelete}
        title="Delete data"
        message={`${t('actionContainer.message')} <span style="color: red;">userName "${selectedUser.name}"</span>? `}
        id={selectedUser.id}
      />
    </div>
  );
};

export default ListUserContainer;
