  import React, { useCallback, useState } from 'react';
  import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
  import ListUsers from './ListUsers';
  import ToolbarActionsSearch from '../../../components/sidebar/ToolbarActionsSearch';
  import {
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TableContainer,
    TablePagination,
  } from '@mui/material';
  import { UserService } from './../../../api/apiService/UserService';
  import { jwtDecode } from 'jwt-decode';
  import { role } from '../../../constants/Enum';
  import Delete from '../../../components/delete/Delete';
  import { useErrorAndSuccess } from '../../../contexts/ErrorAndSuccessContext';
  import { VALIDATE_CODES } from '../../../constants/ValidateCode';
  import UpdateUserContainer from '../updateUsers/UpdateUserContainer';
  import { useTranslation } from 'react-i18next';
import API_PATH from '../../../constants/apiPath';

  const fetchUsers = async (searchValue, page, rowsPerPage, sortName = 'userName', direction = 'ASC') => {
    try {
      const queryParams = new URLSearchParams({
        page: page + 1,
        limit: rowsPerPage,
        sortName: sortName,
        direction: direction,
      }).toString();
      console.log('API Query Params:', queryParams); 

      const requestBody = {
        userName: searchValue.userName ?? '',
        fullName: searchValue.fullName ?? '',
        role: searchValue.role ?? '',
      };

      console.log(`${API_PATH.USER.SEARCH_USER}&${queryParams}`);  
      const response = await UserService.listUser(requestBody);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gọi API tìm kiếm người dùng:', error);
      throw error;
    }
  };

  const ListUserContainer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState({
      userName: '',
      fullName: '',
      role: '',
    });
    
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const { showError, showSuccess } = useErrorAndSuccess();

    const {t} = useTranslation();

    const queryClient = useQueryClient();

    const columns = [
      { id: 'fullName', label: t('tableContainer.fullName'), minWidth: 150 },
      { id: 'userName', label: t('tableContainer.userName'), minWidth: 150 },
      { id: 'email', label: t('tableContainer.email'), minWidth: 170 },
      { id: 'dob', label: t('tableContainer.birthday'), minWidth: 100, align: 'center' },
      { id: 'role', label: t('tableContainer.role'), minWidth: 150, align: 'center' },
      { id: 'actions', label: t('tableContainer.action'), minWidth: 200, align: 'center' },
    ];

    const openModalUpdate = (id) => {
      setSelectedUserId(id)
      setOpenUpdateModal(true);
    };
    
    const handleCloseModalUpdate = () => {
      setOpenUpdateModal(false);
    };

    
    

    const openModalDelete = (id, name) => {
      setSelectedUserId(id);
      setSelectedUserName(name);
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
        setSelectedUserId(null);
      },
      onError: (error) => {
        showError(error.response.data.message);
        console.error('Lỗi khi xóa người dùng:', error);
      },
    });
    const confirmDelete = () => {
      console.log('Delete user with id:', selectedUserId);

      if (!selectedUserId) return;
      deleteUser(selectedUserId);

      setOpenDeleteModal(false);
      setSelectedUserId(null);
    };

    const { data: dataUsers, isLoading } = useQuery({
      queryKey: ['users', searchValue, page, rowsPerPage],
      queryFn: () => fetchUsers(searchValue, page, rowsPerPage),
      keepPreviousData: true,
    });

    console.log(dataUsers);

    const formattedRows = (dataUsers?.data?.docs || []).map((row) => ({
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
      console.log('Selected rows per page:', newRowsPerPage);
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    };



    const handleSearchChange = (field, value) => {
      setSearchValue((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const currentUserRole = decoded.data.role;

    return (
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <ToolbarActionsSearch
            onChange={(e) => {
              handleSearchChange('userName', e.target.value);
            }}
            label={t('searchContainer.searchByUserName')}
          />
          <ToolbarActionsSearch
            onChange={(e) => {
              handleSearchChange('fullName', e.target.value);
            }}
            label={t('searchContainer.searchByFullName')}
          />
          <FormControl variant="standard" sx={{ mr: 2, mb: 1, width: '200px' }}>
            <InputLabel>{t('searchContainer.searchByRole')}</InputLabel>
            <Select
              value={searchValue.role}
              onChange={(e) => handleSearchChange('role', e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value={role.ADMIN}>Admin</MenuItem>
              <MenuItem value={role.USER}>User</MenuItem>
            </Select>
          </FormControl>
        </div>

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
              handleName={selectedUserName}
            />
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[4, 25, 100]}
            component="div"
            count={rows || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Modal open={openUpdateModal} onClose={handleCloseModalUpdate}>
          <UpdateUserContainer
            onclose={handleCloseModalUpdate}
            id={selectedUserId}
          />
        </Modal>

        <Delete
          open={openDeleteModal}
          onClose={handleCloseModalDelete}
          onDelete={confirmDelete}
          id={selectedUserId}
          name={`userName "${selectedUserName}"`}
        />
      </div>
    );
  };

  export default ListUserContainer;
