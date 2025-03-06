import React, { useState } from 'react';

const ListUserContainer = () => {
  const columns = [
    { id: 'fullName', label: 'Full name', minWidth: 170 },
    { id: 'userName', label: 'userName', minWidth: 150 },
    {
      id: 'dob',
      label: 'Ngày sinh',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'role',
      label: 'Role',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 200,
      align: 'center',
    },
  ];

  function createData(id, fullName, userName, dob, role) {
    return { id, fullName, userName, dob, role };
  }

  const rows = [
    createData(1, 'Nguyễn Văn A', 'nguyenvana', '1990-05-15', 'Admin'),
    createData(2, 'Trần Thị B', 'tranthib', '1995-09-20', 'User'),
    createData(3, 'Lê Văn C', 'levanc', '1988-12-10', 'Admin'),
    createData(4, 'Phạm Thị D', 'phamthid', '2000-07-30', 'User'),
    createData(5, 'Hoàng Văn E', 'hoangvane', '1992-03-25', 'Admin'),
    createData(6, 'Đặng Thị F', 'dangthif', '1998-11-12', 'User'),
    createData(7, 'Bùi Văn G', 'buivang', '1985-06-05', 'Admin'),
    createData(8, 'Lý Thị H', 'lythih', '1993-08-18', 'User'),
    createData(9, 'Vũ Văn I', 'vuvani', '2001-04-02', 'User'),
    createData(10, 'Dương Thị J', 'duongthij', '1996-10-14', 'Admin'),
    createData(11, 'Đặng Thị E', 'dangthie', '1998-11-12', 'User'),
    createData(12, 'Bùi Văn O', 'buivano', '1985-06-05', 'Admin'),
    createData(13, 'Lý Thị T', 'lythit', '1993-08-18', 'User'),
    createData(14, 'Vũ Văn B', 'vuvanb', '2001-04-02', 'User'),
    createData(15, 'Dương Thị A', 'duongthia', '1996-10-14', 'Admin'),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (id) => {
    console.log('Update user with id:', id);
    // Viết logic update user tại đây
  };

  const handleDelete = (id) => {
    console.log('Delete user with id:', id);
    // Viết logic xóa user tại đây
  };

  return {
    columns,
    rows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUpdate,
    handleDelete,
  };
};

export default ListUserContainer;
