import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import structures from '../data';

// Задание 3, шаг 2: удаляем последний элемент массива
const imgData = structures.slice(0, -1);

function Gallery() {
  return (
    // Задание 3, шаг 5: оборачиваем в Container lg для адаптивности
    <Container maxWidth="lg">
      {/* Задание 3, шаг 4: Box с фиксированной высотой и прокруткой */}
      <Box sx={{ height: 585, overflowY: 'scroll', m: '20px auto' }}>
        {/* Задание 3, шаг 5: адаптивное количество колонок */}
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: '1 !important',
              sm: '2 !important',
              md: '3 !important',
              lg: '4 !important',
            },
          }}
          gap={8}
        >
          {imgData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={item.img}
                src={item.img}
                alt={item.title}
                loading="lazy"
              />
              {/* Задание 3, шаг 6: подписи к рисункам */}
              <ImageListItemBar position="bottom" title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}

export default Gallery;
