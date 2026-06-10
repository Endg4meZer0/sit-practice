import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface ComponentProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  index: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1.2)
}));

function BuildCard({ building, index }: ComponentProps) {
  const isEven = index % 2 === 0;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isEven ? 'row-reverse' : 'row',
        height: '100%',
        minHeight: 260
      }}
    >
      <CardMedia
        component="img"
        alt={building.title}
        image={building.img}
        sx={{
          width: { xs: '42%', sm: '38%' },
          objectFit: 'cover'
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h3">
            {building.title}
          </Typography>

          {building.description.map((item, ind) => (
            <StyledTypography key={ind} variant="body2">
              {item}
            </StyledTypography>
          ))}
        </CardContent>

        <CardActions
          sx={{
            justifyContent: isEven ? 'flex-start' : 'flex-end'
          }}
        >
          <Button size="small">Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default BuildCard;