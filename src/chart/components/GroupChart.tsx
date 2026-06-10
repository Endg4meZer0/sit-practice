import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { tGroup } from '../groupdata';
import SettingChart, { tSeries } from './SettingChart';

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false
  });
  const [isBar, setIsBar] = React.useState(true);

  const seriesY = Object.entries(series)
    .filter((item) => item[1] === true)
    .map((item) => {
      return { dataKey: item[0], label: item[0] };
    });

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
    margin: { left: 70 }
  };

  return (
    <Container maxWidth="lg">
      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />

      {seriesY.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ my: 4 }}>
          Выберите хотя бы один ряд данных для отображения диаграммы.
        </Typography>
      ) : isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          barLabel={seriesY.length === 1 ? 'value' : undefined}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' }
            }
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' }
            }
          }}
          {...chartSetting}
        />
      )}
    </Container>
  );
}

export default GroupChart;
