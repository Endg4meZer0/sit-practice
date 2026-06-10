import Container from '@mui/material/Container';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import { tGroup } from '../groupdata';

type GroupProps = {
  data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const rows: GridRowsProp = data;
  const columns: GridColDef[] = [
    { field: 'Группа', headerName: 'Группа', flex: 1 },
    { field: 'Минимальная высота', type: 'number', flex: 1 },
    { field: 'Максимальная высота', type: 'number', flex: 1 },
    { field: 'Средняя высота', type: 'number', flex: 1 }
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '500px', mt: '20px' }}>
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

export default GroupGrid;
