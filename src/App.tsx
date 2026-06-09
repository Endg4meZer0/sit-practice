import React, { useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import './App.css';

interface ImageItem {
  id: number;
  src: string;
}

interface ContentCard {
  id: string;
  title: string;
  description: string;
  image: string;
  size: 'small' | 'big';
  gridColumn: number;
  gridRow: number;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const galleryImages: ImageItem[] = [
    { id: 1, src: 'https://thefrisky.com/wp-content/uploads/2019/01/windows-logo-1.png' },
    { id: 2, src: 'https://logospng.org/download/apple/logo-apple-1024.png' },
    { id: 3, src: 'https://i.etsystatic.com/21812990/r/il/1b6940/2314861823/il_fullxfull.2314861823_gvzf.jpg' },
    { id: 4, src: 'https://i.etsystatic.com/21812990/r/il/1b6940/2314861823/il_fullxfull.2314861823_gvzf.jpg' },
    { id: 5, src: 'https://logospng.org/download/apple/logo-apple-1024.png' },
    { id: 6, src: 'https://thefrisky.com/wp-content/uploads/2019/01/windows-logo-1.png' },
  ];

  // Сетка 5 столбцов, 3 ряда
  // Нечетные столбцы (1, 3, 5): розовые плитки в среднем ряду
  // Четные столбцы (2, 4): белые плитки в верхнем и нижнем рядах
  const contentCards: ContentCard[] = [
    // Столбец 1 (нечетный)
    { id: 'big-1', title: 'Заголовок', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, sapien at blandit varius, diam ante aliquet nulla, at rutrum erat metus vitae lacus.', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'big', gridColumn: 1, gridRow: 2 },
    // Столбец 2 (четный)
    { id: 'small-2-1', title: 'Заголовок', description: 'Lorem ipsum', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'small', gridColumn: 2, gridRow: 1 },
    { id: 'small-2-2', title: 'Заголовок', description: 'Lorem ipsum', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'small', gridColumn: 2, gridRow: 3 },
    // Столбец 3 (нечетный)
    { id: 'big-3', title: 'Заголовок', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, sapien at blandit varius, diam ante aliquet nulla, at rutrum erat metus vitae lacus.', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'big', gridColumn: 3, gridRow: 2 },
    // Столбец 4 (четный)
    { id: 'small-4-1', title: 'Заголовок', description: 'Lorem ipsum', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'small', gridColumn: 4, gridRow: 1 },
    { id: 'small-4-2', title: 'Заголовок', description: 'Lorem ipsum', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'small', gridColumn: 4, gridRow: 3 },
    // Столбец 5 (нечетный)
    { id: 'big-5', title: 'Заголовок', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lobortis, sapien at blandit varius, diam ante aliquet nulla, at rutrum erat metus vitae lacus.', image: 'https://logospng.org/download/apple/logo-apple-1024.png', size: 'big', gridColumn: 5, gridRow: 2 },
  ];

  const handleSearch = () => {
    console.log('Поиск:', searchQuery);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          border: 'thin solid #dddddd',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          margin: '20px auto 0',
          padding: '8px 12px',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              component="a"
              href="#"
              sx={{
                textTransform: 'none',
                padding: '4px 12px',
                fontSize: '16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                backgroundColor: '#2498f3',
                color: 'white',
                '&:hover': { backgroundColor: '#2498f3' },
              }}
            >
              Операционные системы
            </Button>
            <Button
              component="a"
              href="list.html"
              sx={{
                textTransform: 'none',
                padding: '4px 12px',
                fontSize: '16px',
                color: '#2498f3',
                borderRadius: '8px',
                '&:hover': { backgroundColor: 'rgba(36, 152, 243, 0.08)' },
              }}
            >
              Рейтинг операционных систем
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Найти"
            size="small"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: '180px',
              '& .MuiInputBase-root': {
                height: '28px',
              },
            }}
          />
          <Button
            component="a"
            href="#"
            onClick={handleSearch}
            sx={{
              color: 'white',
              backgroundColor: '#2498f3',
              textTransform: 'none',
              padding: '4px 10px',
              borderRadius: '4px',
              '&:hover': { backgroundColor: '#1976d2' },
            }}
          >
            Поиск
          </Button>
        </Box>
      </Box>

      {/* Gallery */}
      <Box
        sx={{
          width: '90%',
          margin: '30px auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gridTemplateRows: isMobile ? 'auto' : 'repeat(2, 150px)',
          gap: '15px',
        }}
      >
        {galleryImages.map((img, index) => {
          const positionStyles = isMobile
            ? {}
            : index === 0
            ? { gridColumn: 1, gridRow: '1 / 3' }
            : index === 5
            ? { gridColumn: 4, gridRow: '1 / 3' }
            : index === 1
            ? { gridColumn: 2, gridRow: 1 }
            : index === 2
            ? { gridColumn: 3, gridRow: 1 }
            : index === 3
            ? { gridColumn: 2, gridRow: 2 }
            : { gridColumn: 3, gridRow: 2 };

          return (
            <Box
              key={img.id}
              component="a"
              href={index === 0 || index === 5 ? 'more.html' : '#'}
              sx={{
                ...positionStyles,
                overflow: 'hidden',
                display: 'block',
                borderRadius: '4px',
                cursor: 'pointer',
                '& img': {
                  width: '100%',
                  height: isMobile ? '150px' : '100%',
                  objectFit: 'cover',
                  display: 'block',
                },
              }}
            >
              <img src={img.src} alt={`OS Logo ${img.id}`} />
            </Box>
          );
        })}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, width: '80%', margin: '0 auto 30px', marginBottom: '30px' }}>
        {!isMobile && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(3, auto)',
              gap: '12px',
            }}
          >
            {contentCards.map((card) => (
              <Card
                key={card.id}
                sx={{
                  gridColumn: card.gridColumn,
                  gridRow: card.gridRow,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: card.size === 'big' ? '#f8bbd0' : 'white',
                  borderRadius: card.size === 'big' ? '16px' : '0px',
                  border: card.size === 'small' ? '1px solid grey' : 'none',
                  padding: card.size === 'big' ? '8px' : '4px',
                  textAlign: card.size === 'big' ? 'justify' : 'center',
                }}
              >
                {card.size === 'big' ? (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '-8px' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                      {card.description}
                    </Typography>
                    <CardMedia component="img" image={card.image} alt={card.title} sx={{ height: '80px', objectFit: 'contain', marginBottom: '8px' }} />
                    <Box sx={{ marginTop: 'auto', textAlign: 'right' }}>
                      <Button href="#" sx={{ color: '#2498f3', textTransform: 'none' }}>
                        Подробнее
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <CardMedia component="img" image={card.image} alt={card.title} sx={{ height: '70px', objectFit: 'contain', marginBottom: '4px' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption">{card.description}</Typography>
                  </>
                )}
              </Card>
            ))}
          </Box>
        )}

        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {contentCards.map((card) => (
              <Card
                key={card.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: card.size === 'big' ? '#f8bbd0' : 'white',
                  borderRadius: card.size === 'big' ? '16px' : '0px',
                  border: card.size === 'small' ? '1px solid grey' : 'none',
                  padding: card.size === 'big' ? '8px' : '4px',
                  textAlign: card.size === 'big' ? 'justify' : 'center',
                }}
              >
                {card.size === 'big' ? (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '-8px' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                      {card.description}
                    </Typography>
                    <CardMedia component="img" image={card.image} alt={card.title} sx={{ height: '80px', objectFit: 'contain', marginBottom: '8px' }} />
                    <Box sx={{ marginTop: 'auto', textAlign: 'right' }}>
                      <Button href="#" sx={{ color: '#2498f3', textTransform: 'none' }}>
                        Подробнее
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <CardMedia component="img" image={card.image} alt={card.title} sx={{ height: '70px', objectFit: 'contain', marginBottom: '4px' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption">{card.description}</Typography>
                  </>
                )}
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #ddd', padding: '20px', textAlign: 'center', backgroundColor: '#fafafa', marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          Тарасенко Т.В., Б9123-02.03.03тп/1
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
