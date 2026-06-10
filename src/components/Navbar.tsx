import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ComponentProps {
  active: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
  backgroundColor: '#ffffff'
}));

const menuItems = [
  { id: '1', title: 'Главная', to: '/' },
  { id: '2', title: 'Список зданий', to: '/list' },
  { id: '3', title: 'Диаграммы', to: '/chart' },
  { id: '4', title: 'Проверь себя', to: '/testing' }
];

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px'
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography
            variant="h6"
            sx={{
              color: '#5d8aa8',
              fontWeight: 700,
              fontSize: { xs: '16px', sm: '20px' }
            }}
          >
            Самые высокие здания и сооружения
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                component={RouterLink}
                to={item.to}
                variant={active === item.id ? 'contained' : 'text'}
                color="info"
                size="medium"
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {menuItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    component={RouterLink}
                    to={item.to}
                    selected={active === item.id}
                    onClick={toggleDrawer(false)}
                    sx={{
                      '&.Mui-selected': {
                        bgcolor: 'info.main',
                        color: 'common.white'
                      },
                      '&.Mui-selected:hover': {
                        bgcolor: 'info.dark'
                      },
                      '&:hover': {
                        bgcolor: 'info.light',
                        color: 'common.white'
                      }
                    }}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
