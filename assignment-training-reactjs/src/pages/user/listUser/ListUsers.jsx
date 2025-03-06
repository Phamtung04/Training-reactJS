import React from 'react';
import ToolbarActionsSearch from '../../../components/sidebar/ToolbarActionsSearch';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import ListUserContainer from './ListUserContainer';

const ListUsers = () => {
  const {
    columns,
    rows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleUpdate,
    handleDelete,
  } = ListUserContainer();
  return (
    <div className="mt-10">
      <ToolbarActionsSearch />
      <Paper elevation={0} sx={{ mt: 5, width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }} className="flow">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      background: '#9810fa',
                      color: '#fff',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'actions' ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ outline: 'none' }}
                                onClick={() => handleUpdate(row.id)}
                              >
                                Update
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{ ml: 1 }}
                                style={{ outline: 'none' }}
                                onClick={() => handleDelete(row.id)}
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ListUsers;
