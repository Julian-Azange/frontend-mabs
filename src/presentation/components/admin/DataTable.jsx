import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

/**
 * Componente reutilizable de DataGrid.
 * @param {Array} rows - Los datos que se mostrarán en las filas.
 * @param {Array} columns - La definición de las columnas.
 * @param {Object} [sx] - Estilos personalizados para el contenedor Box.
 * @param {Object} [dataGridProps] - Props adicionales para el componente DataGrid.
 */
export const DataTable = ({ rows, columns, sx, ...dataGridProps }) => {
    return (
        // Usamos un Box para darle un ancho completo y permitir estilos
        <Box sx={{ width: '100%', ...sx }}>
            <DataGrid
                // --- Props Esenciales ---
                rows={rows}
                columns={columns}

                // --- Configuración Común ---
                // Esto le dice al grid que se ajuste automáticamente a la altura de su contenido.
                autoHeight

                // --- Paginación ---
                // Define los tamaños de página disponibles
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                    pagination: {
                        // Fija el tamaño de página inicial
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}

                // --- Identificador de Fila ---
                // Le decimos al grid que use el campo 'id' de tus datos como clave única.
                // Esto es VITAL si tu campo no se llama 'id' (ej: '_id', 'uuid')
                // En tu caso, ya lo llamamos 'id' en las columnas, así que esto es lo correcto.
                getRowId={(row) => row.id}

                // --- Otras Props Útiles ---
                // Deshabilita la selección de fila al hacer clic
                disableRowSelectionOnClick

                // Pasa cualquier otra prop (como 'checkboxSelection')
                {...dataGridProps}
            />
        </Box>
    );
};

export default DataTable;