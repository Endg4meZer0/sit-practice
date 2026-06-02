import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import structures from '../data';
import BuildCard from './BuildCard';

// Задание 4, шаг 1: выбираем четыре карточки из массива
const cardData = [structures[3], structures[6], structures[9], structures[7]];

function Content() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* MUI v5: Grid item + xs/md вместо size */}
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {cardData.map((item, index) => (
          <Grid key={index} item xs={12} md={6}>
            <BuildCard building={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
