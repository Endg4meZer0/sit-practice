import Container from '@mui/material/Container';
import buildings from '../table';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';

function BuildingsGrid() {
  const rows: GridRowsProp = buildings;
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Тип', flex: 0.6 },
    { field: 'Страна', flex: 0.5 },
    { field: 'Город', flex: 0.5 },
    { field: 'Год', type: 'number', flex: 0.35 },
    { field: 'Высота', type: 'number', flex: 0.4 }
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '700px', mt: '20px' }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        showToolbar={true}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </Container>
  );
}

export default BuildingsGrid;
