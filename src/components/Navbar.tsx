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
import { Link } from 'react-router-dom';

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

interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getVariant = (pageNum: string) =>
    active === pageNum ? 'contained' : 'text';

  const linkStyle = { textDecoration: 'none' };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography variant="h6" sx={{ color: '#5d8aa8' }}>
            Самые высокие здания и сооружения
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/" style={linkStyle}>
              <Button variant={getVariant('1') as 'contained' | 'text'} color="info" size="medium">
                Главная
              </Button>
            </Link>
            <Link to="/list" style={linkStyle}>
              <Button variant={getVariant('2') as 'contained' | 'text'} color="info" size="medium">
                Список зданий
              </Button>
            </Link>
            <Link to="/chart" style={linkStyle}>
              <Button variant={getVariant('3') as 'contained' | 'text'} color="info" size="medium">
                Диаграммы
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Link to="/" style={linkStyle} onClick={toggleDrawer(false)}>
                  <MenuItem
                    sx={{
                      bgcolor: active === '1' ? 'info.main' : 'transparent',
                      color: active === '1' ? 'white' : 'inherit',
                      '&:hover': { bgcolor: 'info.light', color: 'white' },
                    }}
                  >
                    Главная
                  </MenuItem>
                </Link>
                <Link to="/list" style={linkStyle} onClick={toggleDrawer(false)}>
                  <MenuItem
                    sx={{
                      bgcolor: active === '2' ? 'info.main' : 'transparent',
                      color: active === '2' ? 'white' : 'inherit',
                      '&:hover': { bgcolor: 'info.light', color: 'white' },
                    }}
                  >
                    Список зданий
                  </MenuItem>
                </Link>
                <Link to="/chart" style={linkStyle} onClick={toggleDrawer(false)}>
                  <MenuItem
                    sx={{
                      bgcolor: active === '3' ? 'info.main' : 'transparent',
                      color: active === '3' ? 'white' : 'inherit',
                      '&:hover': { bgcolor: 'info.light', color: 'white' },
                    }}
                  >
                    Диаграммы
                  </MenuItem>
                </Link>
              </Box>
            </Drawer>
          </Box>

        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
