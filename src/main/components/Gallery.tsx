import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';
import structures from '../../data';

const imgData = structures;

function Gallery() {
  return (
    <Container id="gallery" maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mt: 4,
          mb: 2,
          color: '#5d8aa8',
          fontWeight: 700
        }}
      >
        Галерея рисунков
      </Typography>

      <Box
        sx={{
          height: 585,
          overflowY: 'scroll',
          m: '20px auto'
        }}
      >
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: '1 !important',
              sm: '2 !important',
              md: '3 !important',
              lg: '4 !important'
            }
          }}
          gap={8}
        >
          {imgData.map((item, index) => (
            <ImageListItem
              key={item.title}
              component={RouterLink}
              to={`/building/${index}`}
              sx={{
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%' }}
              />
              <ImageListItemBar position="bottom" title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}

export default Gallery;
