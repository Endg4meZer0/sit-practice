import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Самостоятельное задание 1: StyledTypography с цветом, выравниванием и отступами
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1),
}));

interface ComponentProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  // Самостоятельное задание 1: номер карточки для управления порядком
  index: number;
}

function BuildCard({ building, index }: ComponentProps) {
  // Самостоятельное задание 1:
  // Чётные карточки (0, 2): рисунок слева, кнопка справа
  // Нечётные карточки (1, 3): рисунок справа, кнопка слева
  const isEven = index % 2 === 0;

  return (
    <Card sx={{ display: 'flex' }}>
      {/* Порядок элементов зависит от номера карточки */}
      <CardMedia
        component="img"
        alt={building.title}
        image={building.img}
        sx={{
          order: isEven ? 0 : 1,
          width: '40%',
          objectFit: 'cover',
        }}
      />
      <Box sx={{ order: isEven ? 1 : 0, flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {building.title}
          </Typography>
          {building.description.map((item, ind) => (
            // Самостоятельное задание 1: используем StyledTypography
            <StyledTypography key={ind} variant="body2">
              {item}
            </StyledTypography>
          ))}
        </CardContent>
        {/* Самостоятельное задание 1: положение кнопки зависит от номера карточки */}
        <CardActions sx={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
          <Button size="small" color="info">Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default BuildCard;
