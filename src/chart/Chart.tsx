import React from 'react';
import Navbar from "../components/Navbar";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import GroupGrid from './components/GroupGrid';
import GroupChart from './components/GroupChart';
import { years, countries, types } from "./groupdata";

type tSelect = "Страна" | "Год" | "Тип";

function Chart() {
  const [group, setGroup] = React.useState<tSelect>('Страна');
  const [groupData, setGroupData] = React.useState(countries);

  const handleChange = (event: SelectChangeEvent) => {
    const val = event.target.value as tSelect;
    setGroup(val);
    if (val === 'Страна') setGroupData(countries);
    else if (val === 'Год') setGroupData(years);
    else if (val === 'Тип') setGroupData(types);
  };

  return (
    <div>
      <Navbar active="3" />
      <Box sx={{ width: '200px', m: 'auto', mt: '20px' }}>
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
    </div>
  );
}

export default Chart;
