import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import structures from '../data';

function Building() {
  const { id } = useParams();
  const index = id ? parseInt(id) : 0;
  const building = structures[index] || structures[0];

  return (
    <div>
      <Navbar active="" />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '0.875rem' }}>
            главная
          </Link>
          <Typography color="text.primary" variant="body2">
            {building.title}
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          {building.title}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={building.img}
              alt={building.title}
              sx={{ width: '100%', maxWidth: 500, objectFit: 'cover', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {building.description.map((para, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 2, textAlign: 'justify', color: 'text.secondary' }}>
                {para}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Building;
