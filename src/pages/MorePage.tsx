import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { osFamilies } from '../data/osData';

interface MorePageProps {
  slug?: string;
  isMobile: boolean;
}

const MorePage: React.FC<MorePageProps> = ({ slug, isMobile }) => {
  const family = slug ? osFamilies.find((item) => item.slug === slug) : null;
  const availableFamilies = osFamilies.filter((item) => item.slug !== slug);
  const typeLabel = 'Десктопная';
  const recommendedLabel = family?.slug === 'macos' ? 'креативных и мультимедийных задач' : family?.slug === 'linux' ? 'разработки, учебы и серверных систем' : 'широкого круга пользователей';
  const styleLabel = family?.slug === 'macos' ? 'чистый и дизайнерский' : family?.slug === 'linux' ? 'настраиваемый и функциональный' : 'комфортный и знакомый';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '90%', margin: '20px auto 40px' }}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 2, alignItems: 'center', marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {family ? family.name : 'Подробнее о платформе'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {family ? `Динамическая карточка для семейства ${family.name}.` : 'Выберите одно из доступных семейств чтобы посмотреть детали.'}
          </Typography>
        </Box>

        <Button component="a" href="#main" variant="contained" sx={{ textTransform: 'none' }}>
          Вернуться на главную
        </Button>
      </Box>

      {family ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr', gap: 3, marginBottom: 3 }}>
          <Card sx={{ borderRadius: '16px' }}>
            <CardMedia component="img" image={family.hero} alt={family.name} sx={{ height: 220, objectFit: 'contain', backgroundColor: '#fff' }} />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: family.accent, marginBottom: 1 }}>
                {family.header}
              </Typography>
              <Typography variant="body1" paragraph>
                {family.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {family.details}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f7f7f7' }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              Ключевые характеристики
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">Тип: {typeLabel}</Typography>
              <Typography variant="body2">Рекомендовано для: {recommendedLabel}</Typography>
              <Typography variant="body2">Стиль: {styleLabel}</Typography>
            </Box>
          </Card>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          {osFamilies.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.slug}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia component="img" image={item.logo} alt={item.name} sx={{ height: 140, objectFit: 'contain', backgroundColor: '#fff' }} />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    {item.short}
                  </Typography>
                  <Button component="a" href={`#more/${item.slug}`} variant="outlined" sx={{ textTransform: 'none' }}>
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {family && (
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2, marginBottom: 3 }}>
          <Card sx={{ borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Почему стоит обратить внимание
              </Typography>
              <Typography variant="body2" paragraph>
                {family.name} сочетает узнаваемый стиль, простоту использования и устойчивость. В зависимости от задач эта платформа позволяет сосредоточиться на результате, не отвлекаясь на лишние настройки.
              </Typography>
              <Typography variant="body2" paragraph>
                Если нужна логичная структура, аккуратный пользовательский интерфейс и стабильная работа, {family.name} предлагает понятный опыт для широкой аудитории.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: '16px', backgroundColor: '#fafafa' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Другие интересные семейства
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {availableFamilies.map((item) => (
                  <Button key={item.slug} component="a" href={`#more/${item.slug}`} variant="outlined" sx={{ textTransform: 'none' }}>
                    {item.name}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      <Box sx={{ borderTop: '1px solid #ddd', padding: '20px', textAlign: 'center', backgroundColor: '#fafafa', marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          Тарасенко Т.В., Б9123-02.03.03тп/1
        </Typography>
      </Box>
    </Box>
  );
};

export default MorePage;
