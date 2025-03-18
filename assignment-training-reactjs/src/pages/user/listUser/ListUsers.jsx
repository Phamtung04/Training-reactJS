import React, { Fragment, use } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { role } from '../../../constants/Enum';
import DangerousIcon from '@mui/icons-material/Dangerous';
import SettingsIcon from '@mui/icons-material/Settings';

const ListUsers = ({
  columns = [],
  rows = [],
  page,
  rowsPerPage,
  handleUpdate,
  handleDelete,
  handleName,
  currentUserRole,
}) => {
  return (
    <Fragment>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.length > 0 &&
              columns.map((column) => (
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
          {rows.length > 0 ? (
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'actions' ? (
                      Number(currentUserRole) === role.ADMIN ? (
                        <>
                          <Button
                            variant="contained"
                            color="transparent"
                            style={{ outline: 'none' }}
                            onClick={() => handleUpdate(row._id)}
                          >
                            <SettingsIcon color='primary' />
                          </Button>
                          <Button
                            variant="contained"
                            color="transparent"
                            sx={{ ml: 1 }}
                            style={{ outline: 'none' }}
                            onClick={() => {
                              handleDelete(row._id, row.userName);
                            }}
                          >
                            <DangerousIcon color='error' />
                          </Button>
                        </>
                      ) : (
                        <span>Không có quyền</span>
                      )
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default ListUsers;
