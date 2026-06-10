import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'grey.50'
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            gap: 2,
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              sm: 'center'
            }
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: '#5d8aa8',
                fontWeight: 700
              }}
            >
              Самые высокие здания и сооружения
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Лабораторная работа: TypeScript, React и библиотека MUI.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Link component={RouterLink} to="/" underline="hover" color="info.main">
              Главная
            </Link>

            <Link component={RouterLink} to="/list" underline="hover" color="info.main">
              Список зданий
            </Link>

            <Link component={RouterLink} to="/chart" underline="hover" color="info.main">
              Диаграммы
            </Link>

            <Link component={RouterLink} to="/testing" underline="hover" color="info.main">
              Проверь себя
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
