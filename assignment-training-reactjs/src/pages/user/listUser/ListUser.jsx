import React, { Fragment } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from '@mui/material';
import { ROLE } from '../../../constants/enum';
import DangerousIcon from '@mui/icons-material/Dangerous';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from 'react-i18next';

const ListUser = ({
  columns = [],
  rows = [],
  handleUpdate,
  handleDelete,
  currentUserRole,
  sortConfig,
  onSort,
  isLoading,
}) => {
  const { t } = useTranslation();

  const handleSortClick = (columnId) => {
    if (onSort) {
      let direction = 'ASC';
      if (sortConfig && sortConfig.key === columnId) {
        direction = sortConfig.direction === 'ASC' ? 'DESC' : 'ASC';
      }
      onSort(columnId, direction);
    }
  };

  const getSortIcon = (columnId) => {
    if (sortConfig && sortConfig.key === columnId) {
      return sortConfig.direction === 'ASC' ? (
        <ArrowUpwardIcon fontSize="small" />
      ) : (
        <ArrowDownwardIcon fontSize="small" />
      );
    }
    return null;
  };

  return (
    <Fragment>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
                      cursor: column.sortable ? 'pointer' : 'default',
                    }}
                    onClick={() => column.sortable && handleSortClick(column.id)}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: column.align === 'center' ? 'center' : 'flex-start',
                      }}
                    >
                      {column.label}
                      {column.sortable && getSortIcon(column.id)}
                    </Box>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'actions' ? (
                        Number(currentUserRole) === ROLE.ADMIN ? (
                          <>
                            <Button
                              variant="contained"
                              color="transparent"
                              style={{ outline: 'none' }}
                              onClick={() => handleUpdate(row._id)}
                            >
                              <SettingsIcon color="primary" />
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
                              <DangerousIcon color="error" />
                            </Button>
                          </>
                        ) : (
                          <span>{t('tableContainer.noPermission')}</span>
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
                  {t('tableContainer.noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Fragment>
  );
};

export default ListUser;
