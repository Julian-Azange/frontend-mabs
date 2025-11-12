import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, IconButton, Tooltip } from '@mui/material'
import { Visibility, Edit, Delete } from '@mui/icons-material'

export default function DataTable({ columns = [], data = [], pageSizeOptions = [5, 10, 25], initialPageSize = 10, onView, onEdit, onDelete, getRowId }) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(initialPageSize)

    const handleChangePage = (event, newPage) => setPage(newPage)
    const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0) }

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - data.length)

    return (
        <Paper elevation={1} sx={{ backgroundColor: 'white' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            {columns.map(col => (
                                <TableCell
                                    key={col.field}
                                    style={{
                                        minWidth: col.minWidth || 100,
                                        color: 'white',
                                        fontWeight: 600
                                    }}
                                >
                                    {col.headerName}
                                </TableCell>
                            ))}
                            <TableCell align="right" sx={{ color: 'white', fontWeight: 600 }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                            <TableRow
                                hover
                                key={getRowId ? getRowId(row) : row.id || idx}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 192, 203, 0.1) !important'
                                    }
                                }}
                            >
                                {columns.map(col => (
                                    <TableCell
                                        key={col.field}
                                        sx={{
                                            color: '#333',
                                            borderBottom: '1px solid rgba(224, 224, 224, 1)'
                                        }}
                                    >
                                        {col.render ? col.render(row[col.field], row) : (col.valueGetter ? col.valueGetter({ row }) : row[col.field])}
                                    </TableCell>
                                ))}
                                <TableCell
                                    align="right"
                                    sx={{
                                        borderBottom: '1px solid rgba(224, 224, 224, 1)'
                                    }}
                                >
                                    <Tooltip title="Ver">
                                        <IconButton
                                            size="small"
                                            onClick={() => onView && onView(row)}
                                            sx={{
                                                color: '#666',
                                                '&:hover': { color: '#333' }
                                            }}
                                        >
                                            <Visibility />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit && onEdit(row)}
                                            sx={{
                                                color: '#666',
                                                '&:hover': { color: '#333' }
                                            }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete && onDelete(row)}
                                            sx={{
                                                color: '#ff4444',
                                                '&:hover': { color: '#cc0000' }
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={columns.length + 1} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={pageSizeOptions}
                sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                        color: '#666'
                    },
                    '.MuiTablePagination-select': {
                        color: '#333'
                    },
                    '.MuiTablePagination-actions': {
                        '& button': {
                            color: '#666',
                            '&:hover': {
                                color: '#333'
                            },
                            '&.Mui-disabled': {
                                color: '#ccc'
                            }
                        }
                    }
                }}
            />
        </Paper>
    )
}
