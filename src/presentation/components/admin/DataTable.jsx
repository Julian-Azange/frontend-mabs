// src/presentation/components/admin/DataTable.jsx
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';

const PRIMARY_COLOR = "#C43670";
const BORDER_COLOR = "#E6E6E6";

export const DataTable = ({ rows, columns, sx, ...dataGridProps }) => {

    // Altura mínima segura para mostrar el header y el footer si no hay datos
    const MIN_HEIGHT = 200;

    return (
        <Box
            sx={{
                width: "100%",
                // Eliminamos el cálculo de altura aquí. Dejamos que autoHeight gestione esto.
                minHeight: MIN_HEIGHT,
                bgcolor: "white",
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${BORDER_COLOR}`,
                ...sx,
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}

                // 💡 CLAVE: Usamos autoHeight para que la altura se ajuste al contenido
                autoHeight
                // Deshabilitamos el scroll interno del DataGrid (scrollableContainer)
                disableVirtualization

                pageSizeOptions={[5, 10, 25]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } }
                }}

                sx={{
                    border: "none",
                    backgroundColor: "white",
                    fontFamily: "Inter, Roboto, sans-serif",
                    // Aseguramos que la tabla no tenga altura fija
                    height: 'auto',

                    /* ENCABEZADOS */
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#FAFAFA",
                        borderBottom: `1px solid ${BORDER_COLOR}`,
                        minHeight: "48px !important",
                        lineHeight: "normal",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        color: "#4A4A4A",
                        letterSpacing: "0.3px",
                    },
                    "& .MuiDataGrid-columnSeparator": { display: "none" },

                    /* FILAS */
                    "& .MuiDataGrid-row": {
                        minHeight: "58px !important",
                        height: "58px !important",
                        borderBottom: `1px solid ${BORDER_COLOR}`,
                        transition: "background-color 0.2s ease-out",
                        "&:hover": {
                            backgroundColor: "#FBF7F9",
                            cursor: "pointer",
                        },
                        "&.Mui-selected": {
                            backgroundColor: "#FCEBF3 !important",
                        },
                    },

                    /* CELDAS (Alineación) */
                    "& .MuiDataGrid-cell": {
                        padding: "10px 18px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.86rem",
                        color: "#333",
                        border: "none",
                    },

                    /* PAGINACIÓN */
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