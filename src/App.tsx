import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import './App.css';
import ListPage from './pages/ListPage';
import MainPage from './pages/MainPage';
import MorePage from './pages/MorePage';
import QuizPage from './pages/QuizPage';

type RouteState = {
  page: 'main' | 'list' | 'more' | 'quiz';
  slug?: string;
};

const parseHash = (hash: string): RouteState => {
  const cleaned = hash.startsWith('#') ? hash.slice(1) : hash;
  if (cleaned.startsWith('more/')) {
    return { page: 'more', slug: cleaned.replace('more/', '') };
  }
  if (cleaned === 'more') {
    return { page: 'more' };
  }
  if (cleaned === 'list') {
    return { page: 'list' };
  }
  if (cleaned === 'quiz') {
    return { page: 'quiz' };
  }
  return { page: 'main' };
};

const App: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [route, setRoute] = useState<RouteState>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {route.page === 'main' && <MainPage isMobile={isMobile} />}
      {route.page === 'list' && <ListPage isMobile={isMobile} />}
      {route.page === 'more' && <MorePage slug={route.slug} isMobile={isMobile} />}
      {route.page === 'quiz' && <QuizPage />}
    </Box>
  );
};

export default App;
