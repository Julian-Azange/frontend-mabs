import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';

const PRIMARY_COLOR = "#C43670";
const BORDER_COLOR = "#E6E6E6";

export const DataTable = ({ rows, columns, sx, ...dataGridProps }) => {

    const MIN_HEIGHT = 200;

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: MIN_HEIGHT,
                bgcolor: "white",
                borderRadius: 1,
                overflow: "hidden",
                ...sx,
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                }}
                
                sx={{
                    border: 'none', 
                    borderRadius: 1, 
                    boxShadow: 'none',
                    backgroundColor: 'white',
                    
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: '1px solid ' + BORDER_COLOR,
                        backgroundColor: '#FAFAFA',
                        minHeight: '40px !important', 
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 600,
                        fontSize: '0.8rem', 
                        color: '#4A4A4A',
                    },
                    '& .MuiDataGrid-columnSeparator': { display: 'none' },

                    '& .MuiDataGrid-row': {
                        borderBottom: '1px solid #f0f0f0', 
                        '&:hover': { backgroundColor: '#FBF4EB' }, 
                        
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none',
                            padding: '10px 16px',
                            fontSize: '0.85rem',
                            display: 'flex', 
                            alignItems: 'center', 
                        },
                    },
                    
                    // 3. Footer de Paginación
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: `1px solid ${BORDER_COLOR}`,
                        backgroundColor: "#FAFAFA",
                        height: "56px",
                        minHeight: "56px",
                    },
                    "& .MuiTablePagination-root": {
                        fontSize: "0.82rem",
                    },
                }}
                
                disableRowSelectionOnClick
                disableColumnMenu 
                disableDensitySelector 
                disableSelectionOnClick 
                
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                
                {...dataGridProps}
            />
        </Box>
    );
};

export default DataTable;