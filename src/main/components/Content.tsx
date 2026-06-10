import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import structures from '../../data';
import BuildCard from './BuildCard';

const cardData = [structures[3], structures[6], structures[9], structures[7]];

function Content() {
  return (
    <Container id="content" maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 3,
          color: '#5d8aa8',
          fontWeight: 700
        }}
      >
        Основной контент
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr'
          },
          gap: {
            xs: 3,
            md: 6
          }
        }}
      >
        {cardData.map((item, index) => (
          <BuildCard key={item.title} building={item} index={index} />
        ))}
      </Box>
    </Container>
  );
}

export default Content;
