import React, { useState } from 'react';
import { Box, Button, Card, CardMedia, TextField, Typography } from '@mui/material';
import { galleryItems, mainTiles } from '../data/osData';

interface MainPageProps {
  isMobile: boolean;
}

const MainPage: React.FC<MainPageProps> = ({ isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Поиск:', searchQuery);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
              href="#main"
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
              href="#list"
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
            component="button"
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
        {galleryItems.map((item, index) => {
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
              key={item.id}
              component="a"
              href={`#more/${item.slug}`}
              sx={{
                ...positionStyles,
                overflow: 'hidden',
                display: 'block',
                borderRadius: '4px',
                cursor: 'pointer',
                '& img': {
                  width: '100%',
                  height: isMobile ? '150px' : '100%',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: '#fff',
                },
              }}
            >
              <img src={item.src} alt={item.label} />
            </Box>
          );
        })}
      </Box>

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
            {mainTiles.map((card) => (
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
                      <Button href={`#more/${card.familySlug ?? 'windows'}`} sx={{ color: '#2498f3', textTransform: 'none' }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mainTiles.map((card) => (
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
                      <Button href={`#more/${card.familySlug ?? 'windows'}`} sx={{ color: '#2498f3', textTransform: 'none' }}>
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

      <Box sx={{ borderTop: '1px solid #ddd', padding: '20px', textAlign: 'center', backgroundColor: '#fafafa', marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          Тарасенко Т.В., Б9123-02.03.03тп/1
        </Typography>
      </Box>
    </Box>
  );
};

export default MainPage;
