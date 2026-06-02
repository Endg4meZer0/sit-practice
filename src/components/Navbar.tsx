import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { styled } from '@mui/material/styles';

// Задание 2, шаг 3: создаём StyledToolbar на основе Toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
}));

// Самостоятельное задание 3: пропс строкового типа active
interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  // Задание 2, шаг 9: состояние для управления открытием/закрытием Drawer
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Самостоятельное задание 3: определяем variant для каждой кнопки
  const getVariant = (pageNum: string) =>
    active === pageNum ? 'contained' : 'text';

  return (
    // Задание 2, шаг 3: AppBar с прозрачным фоном и отступом сверху
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px',
      }}
    >
      {/* Задание 2, шаг 4: Container для адаптивной ширины */}
      <Container maxWidth="xl">
        <StyledToolbar>

          {/* Задание 2, шаг 5: заголовок сайта */}
          <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
            Самые высокие здания и сооружения
          </Typography>

          {/* Задание 2, шаг 7: меню для экранов md и шире */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* Самостоятельное задание 3: variant зависит от active */}
            <Button variant={getVariant('1') as 'contained' | 'text'} color="info" size="medium">
              Главная
            </Button>
            <Button variant={getVariant('2') as 'contained' | 'text'} color="info" size="medium">
              Список зданий
            </Button>
            <Button variant={getVariant('3') as 'contained' | 'text'} color="info" size="medium">
              Контакты
            </Button>
          </Box>

          {/* Задание 2, шаг 7: кнопка-бургер для экранов xs */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Задание 2, шаг 8-9: Drawer — выпадающее меню */}
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
            >
              <Box>
                {/* Задание 2, шаг 11: кнопка закрытия */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Самостоятельное задание 1: первый пункт выделен (bgcolor info) */}
                {/* Самостоятельное задание 2: hover меняет цвет фона */}
                {/* Самостоятельное задание 3: active prop управляет выделением */}
                <MenuItem
                  onClick={toggleDrawer(false)}
                  sx={{
                    bgcolor: active === '1' ? 'info.main' : 'transparent',
                    color: active === '1' ? 'white' : 'inherit',
                    '&:hover': {
                      bgcolor: 'info.light',
                      color: 'white',
                    },
                  }}
                >
                  Главная
                </MenuItem>
                <MenuItem
                  onClick={toggleDrawer(false)}
                  sx={{
                    bgcolor: active === '2' ? 'info.main' : 'transparent',
                    color: active === '2' ? 'white' : 'inherit',
                    '&:hover': {
                      bgcolor: 'info.light',
                      color: 'white',
                    },
                  }}
                >
                  Список зданий
                </MenuItem>
                <MenuItem
                  onClick={toggleDrawer(false)}
                  sx={{
                    bgcolor: active === '3' ? 'info.main' : 'transparent',
                    color: active === '3' ? 'white' : 'inherit',
                    '&:hover': {
                      bgcolor: 'info.light',
                      color: 'white',
                    },
                  }}
                >
                  Контакты
                </MenuItem>
              </Box>
            </Drawer>
          </Box>

        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
