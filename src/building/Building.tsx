import { Link as RouterLink, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import structures from '../data';

function Building() {
  const { id } = useParams();
  const requestedIndex = Number(id);
  const currentIndex = Number.isInteger(requestedIndex)
    ? Math.min(Math.max(requestedIndex, 0), structures.length - 1)
    : 0;
  const building = structures[currentIndex];

  return (
    <div>
      <Navbar active="1" />

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" underline="hover" color="info.main">
            Главная
          </Link>
          <Typography color="text.primary">{building.title}</Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            mb: 3,
            color: '#5d8aa8',
            fontWeight: 700
          }}
        >
          {building.title}
        </Typography>

        <Box
          component="img"
          src={building.img}
          alt={building.title}
          sx={{
            display: 'block',
            width: { xs: '100%', sm: '70%', md: '50%' },
            maxHeight: 430,
            objectFit: 'cover',
            mx: 'auto',
            mb: 3,
            borderRadius: 1
          }}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: `repeat(${Math.min(building.description.length, 2)}, 1fr)` },
            gap: 3,
            mb: 4
          }}
        >
          {building.description.map((item, index) => (
            <Typography
              key={index}
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'justify' }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

export default Building;
