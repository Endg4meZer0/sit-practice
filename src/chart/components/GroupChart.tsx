import React from 'react';
import Container from '@mui/material/Container';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { tGroup } from "../groupdata";
import SettingChart from './SettingChart';

type GroupChartProps = {
  data: tGroup;
};

type tSeries = {
  'Максимальная высота': boolean;
  'Средняя высота': boolean;
  'Минимальная высота': boolean;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const seriesY = Object.entries(series)
    .filter(item => item[1] === true)
    .map(item => ({ dataKey: item[0], label: item[0] }));

  const activeCount = seriesY.length;

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };

  const commonProps = {
    dataset: data as any,
    xAxis: [{ scaleType: 'band' as const, dataKey: 'Группа' }],
    series: seriesY,
    slotProps: {
      legend: {
        position: { vertical: 'bottom' as const, horizontal: 'center' as const },
      },
    },
    ...chartSetting,
  };

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          {...commonProps}
          barLabel={activeCount === 1 ? 'value' : undefined}
        />
      ) : (
        <LineChart {...commonProps} />
      )}
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );
}

export default GroupChart;
