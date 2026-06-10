import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GroupChart from './components/GroupChart';
import GroupGrid from './components/GroupGrid';
import { countries, tGroup, types, years } from './groupdata';

type tSelect = 'Страна' | 'Год' | 'Тип';

function Chart() {
  const [group, setGroup] = React.useState<tSelect>('Страна');
  const [groupData, setGroupData] = React.useState<tGroup>(countries);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;

    setGroup(value);

    if (value === 'Страна') {
      setGroupData(countries);
    } else if (value === 'Год') {
      setGroupData(years);
    } else {
      setGroupData(types);
    }
  };

  return (
    <div>
      <Navbar active="3" />

      <Box sx={{ width: '200px', m: '20px auto' }}>
        <FormControl fullWidth>
          <InputLabel>Группировать по</InputLabel>
          <Select
            id="select-group"
            value={group}
            label="Группировать по"
            onChange={handleChange}
          >
            <MenuItem value="Страна">Стране</MenuItem>
            <MenuItem value="Год">Году</MenuItem>
            <MenuItem value="Тип">Типу</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />

      <Footer />
    </div>
  );
}

export default Chart;
