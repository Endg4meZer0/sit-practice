import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { familyOptions, listData, osFamilies } from '../data/osData';

type SortField = 'none' | 'users' | 'sharePercent' | 'sharePercentOS';
type ChartType = 'bar' | 'scatter';
type GroupBy = 'family' | 'name';
type Aggregation = 'sum' | 'average';
type MetricField = 'users' | 'sharePercent' | 'sharePercentOS';

interface ListPageProps {
  isMobile: boolean;
}

const sortFields = [
  { value: 'none', label: 'Нет' },
  { value: 'users', label: 'Кол-во установок' },
  { value: 'sharePercent', label: 'Доля рынка' },
  { value: 'sharePercentOS', label: 'Доля в семье ОС' },
];

const metricOptions = [
  { value: 'users', label: 'Кол-во установок' },
  { value: 'sharePercent', label: 'Доля рынка' },
  { value: 'sharePercentOS', label: 'Доля в семье ОС' },
];

const ListPage: React.FC<ListPageProps> = ({ isMobile }) => {
  const [familyFilter, setFamilyFilter] = useState('all');
  const [usersMin, setUsersMin] = useState('');
  const [usersMax, setUsersMax] = useState('');
  const [shareMin, setShareMin] = useState('');
  const [shareMax, setShareMax] = useState('');
  const [shareOSMin, setShareOSMin] = useState('');
  const [shareOSMax, setShareOSMax] = useState('');
  const [sortLevels, setSortLevels] = useState(
    Array.from({ length: 3 }, () => ({ field: 'none' as SortField, order: 'desc' as 'desc' | 'asc' }))
  );
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [groupBy, setGroupBy] = useState<GroupBy>('family');
  const [aggregation, setAggregation] = useState<Aggregation>('sum');
  const [chartMetric, setChartMetric] = useState<MetricField>('users');
  const [chartX, setChartX] = useState<MetricField>('users');
  const [chartY, setChartY] = useState<MetricField>('sharePercent');
  const [page, setPage] = useState(1);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [chartContainerWidth, setChartContainerWidth] = useState(740);
  const pageSize = 8;

  const parseNumber = (value: string) => {
    const trimmed = value.trim();
    if (trimmed === '') {
      return null;
    }
    const number = Number(trimmed);
    return Number.isNaN(number) ? null : number;
  };

  const filters = useMemo(
    () => ({
      family: familyFilter,
      usersMin: parseNumber(usersMin),
      usersMax: parseNumber(usersMax),
      shareMin: parseNumber(shareMin),
      shareMax: parseNumber(shareMax),
      shareOSMin: parseNumber(shareOSMin),
      shareOSMax: parseNumber(shareOSMax),
    }),
    [familyFilter, usersMin, usersMax, shareMin, shareMax, shareOSMin, shareOSMax]
  );

  const filteredData = useMemo(() => {
    const familyName = familyFilter === 'all' ? '' : osFamilies.find((item) => item.slug === familyFilter)?.name || '';
    return listData.filter((item) => {
      if (filters.family !== 'all' && item.family !== familyName) {
        return false;
      }
      if (filters.usersMin !== null && item.users < filters.usersMin) {
        return false;
      }
      if (filters.usersMax !== null && item.users > filters.usersMax) {
        return false;
      }
      if (filters.shareMin !== null && item.sharePercent < filters.shareMin) {
        return false;
      }
      if (filters.shareMax !== null && item.sharePercent > filters.shareMax) {
        return false;
      }
      if (filters.shareOSMin !== null && item.sharePercentOS < filters.shareOSMin) {
        return false;
      }
      if (filters.shareOSMax !== null && item.sharePercentOS > filters.shareOSMax) {
        return false;
      }
      return true;
    });
  }, [filters, familyFilter]);

  const groupedData = useMemo(
    () => {
      const groups: Record<string, { family: string; name: string; users: number; sharePercent: number; sharePercentOS: number; count: number }> = {};
      const groupField = groupBy === 'family' ? 'family' : 'name';

      filteredData.forEach((item) => {
        const key = item[groupField as 'family' | 'name'];
        if (!groups[key]) {
          groups[key] = {
            family: item.family,
            name: item.name,
            users: 0,
            sharePercent: 0,
            sharePercentOS: 0,
            count: 0,
          };
        }
        groups[key].users += item.users;
        groups[key].sharePercent += item.sharePercent;
        groups[key].sharePercentOS += item.sharePercentOS;
        groups[key].count += 1;
      });

      return Object.values(groups);
    },
    [filteredData, groupBy]
  );

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      for (let level of sortLevels) {
        if (level.field === 'none') {
          continue;
        }
        const valueA = a[level.field] ?? 0;
        const valueB = b[level.field] ?? 0;
        if (valueA === valueB) {
          continue;
        }
        return level.order === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }, [filteredData, sortLevels]);

  useEffect(() => {
    setPage(1);
  }, [filteredData, sortLevels]);

  useEffect(() => {
    const node = chartContainerRef.current;
    if (!node || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setChartContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, pageCount);

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [page, currentPage]);

  const pageData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const usedFields = sortLevels.filter((level) => level.field !== 'none').map((level) => level.field);

  const handleSortChange = (index: number, key: 'field' | 'order', value: string) => {
    setSortLevels((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [key]: value } : item
      )
    );
  };

  type BarPoint = { label: string; value: number; family: string };
  type ScatterPoint = { label: string; x: number; y: number; family: string };

  const labelField = groupBy === 'family' ? 'family' : 'name';

  const barChartData = useMemo<BarPoint[]>(() => {
    if (chartType !== 'bar') {
      return [];
    }

    return groupedData.map((item) => ({
      label: item[labelField as 'family' | 'name'],
      value: aggregation === 'average' ? (item[chartMetric] ?? 0) / item.count : item[chartMetric] ?? 0,
      family: item.family,
    }));
  }, [groupedData, chartType, chartMetric, aggregation, labelField]);

  const scatterChartData = useMemo<ScatterPoint[]>(() => {
    if (chartType !== 'scatter') {
      return [];
    }

    return groupedData.map((item) => ({
      label: item[labelField as 'family' | 'name'],
      x: aggregation === 'average' ? (item[chartX] ?? 0) / item.count : item[chartX] ?? 0,
      y: aggregation === 'average' ? (item[chartY] ?? 0) / item.count : item[chartY] ?? 0,
      family: item.family,
    }));
  }, [groupedData, chartType, chartX, chartY, aggregation, labelField]);

  const renderBarChart = () => {
    if (barChartData.length === 0) {
      return <Typography>Нет данных для диаграммы.</Typography>;
    }

    const width = Math.max(520, Math.round(chartContainerWidth));
    const height = 360;
    const padding = { top: 20, right: 20, bottom: 80, left: 70 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const maxValue = Math.max(...barChartData.map((item) => item.value), 1);
    const barCount = barChartData.length;
    const barStep = barCount ? innerWidth / barCount : innerWidth;
    const barWidth = Math.max(24, Math.min(80, barStep * 0.6));

    return (
      <Box ref={chartContainerRef} sx={{ width: '100%', overflowX: 'auto' }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <g transform={`translate(${padding.left},${padding.top})`}>
            <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#68768d" strokeWidth={1} />
            <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#68768d" strokeWidth={1} />
            {Array.from({ length: 5 }, (_, index) => {
              const y = innerHeight - (innerHeight / 4) * index;
              const value = (maxValue / 4) * index;
              return (
                <g key={`y-tick-${index}`}>
                  <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e6e9f0" strokeWidth={1} />
                  <text x={-10} y={y + 4} textAnchor="end" fontSize={10} fill="#333">
                    {value.toFixed(1)}
                  </text>
                </g>
              );
            })}
            {barChartData.map((item, index) => {
              const barHeight = (item.value / maxValue) * innerHeight;
              const x = index * barStep + (barStep - barWidth) / 2;
              const y = innerHeight - barHeight;
              const barColor = item.family === 'Windows' ? '#0067b8' : item.family === 'macOS' ? '#222222' : '#4caf50';
              return (
                <g key={item.label}>
                  <rect x={x} y={y} width={barWidth} height={barHeight} fill={barColor} rx={4} />
                  <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize={12} fill="#1f2937">
                    {item.value.toFixed(1)}
                  </text>
                  <text x={x + barWidth / 2} y={innerHeight + 18} textAnchor="middle" fontSize={12} fill="#222">
                    {item.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </Box>
    );
  };

  const renderScatterChart = () => {
    if (scatterChartData.length === 0) {
      return <Typography>Нет данных для диаграммы.</Typography>;
    }

    const width = Math.max(520, Math.round(chartContainerWidth));
    const height = 360;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const xMax = Math.max(...scatterChartData.map((item) => item.x ?? 0), 0) || 1;
    const yMax = Math.max(...scatterChartData.map((item) => item.y ?? 0), 0) || 1;
    const xScale = (value: number) => (value / xMax) * innerWidth;
    const yScale = (value: number) => innerHeight - (value / yMax) * innerHeight;
    const familyColors: Record<string, string> = {
      Windows: '#0067b8',
      macOS: '#222222',
      Linux: '#4caf50',
    };

    return (
      <Box ref={chartContainerRef} sx={{ width: '100%', overflowX: 'auto' }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <g transform={`translate(${padding.left},${padding.top})`}>
            <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="#68768d" strokeWidth={1} />
            <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="#68768d" strokeWidth={1} />
            {Array.from({ length: 5 }, (_, index) => {
              const x = (innerWidth / 4) * index;
              const xValue = (xMax / 4) * index;
              return (
                <g key={`x-grid-${index}`}>
                  <line x1={x} y1={0} x2={x} y2={innerHeight} stroke="#e6e9f0" strokeWidth={1} />
                  <text x={x} y={innerHeight + 18} textAnchor="middle" fontSize={12} fill="#333">
                    {xValue.toFixed(1)}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: 5 }, (_, index) => {
              const y = innerHeight - (innerHeight / 4) * index;
              const yValue = (yMax / 4) * index;
              return (
                <g key={`y-grid-${index}`}>
                  <line x1={0} y1={y} x2={innerWidth} y2={y} stroke="#e6e9f0" strokeWidth={1} />
                  <text x={-10} y={y + 4} textAnchor="end" fontSize={12} fill="#333">
                    {yValue.toFixed(1)}
                  </text>
                </g>
              );
            })}
            {scatterChartData.map((item) => {
              const x = xScale(item.x ?? 0);
              const y = yScale(item.y ?? 0);
              const dotColor = familyColors[item.family] || '#4f75f5';
              return (
                <g key={item.label}>
                  <circle cx={x} cy={y} r={7} fill={dotColor} />
                  <text x={x - 12} y={y - 10} textAnchor="end" fontSize={12} fill="#1f2937">
                    {item.label}
                  </text>
                </g>
              );
            })}
            <text x={innerWidth / 2} y={innerHeight + 50} textAnchor="middle" fontSize={14} fill="#222">
              {metricOptions.find((option) => option.value === chartX)?.label || chartX}
            </text>
            <text x={-50} y={innerHeight / 2} textAnchor="middle" fontSize={14} fill="#222" transform={`rotate(-90 -50 ${innerHeight / 2})`}>
              {metricOptions.find((option) => option.value === chartY)?.label || chartY}
            </text>
          </g>
        </svg>
      </Box>
    );
  };

  const renderChart = () => {
    if (chartType === 'bar') {
      return renderBarChart();
    }
    return renderScatterChart();
  };

  const renderPageButtons = () => {
    const pages = Array.from({ length: pageCount }, (_, idx) => idx + 1);
    return pages.map((pageNum) => (
      <Button
        key={pageNum}
        variant={pageNum === currentPage ? 'contained' : 'outlined'}
        size="small"
        onClick={() => setPage(pageNum)}
        sx={{ minWidth: 36 }}
      >
        {pageNum}
      </Button>
    ));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '90%', margin: '20px auto 40px' }}>
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, marginBottom: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Рейтинг операционных систем
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Классические фильтры, три уровня сортировки и диаграммы по оригинальному макету.
          </Typography>
        </Box>

        <Button component="a" href="#main" variant="contained" sx={{ textTransform: 'none' }}>
          Вернуться на главную
        </Button>
      </Box>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Фильтр
        </Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))' }}>
          <FormControl fullWidth size="small">
            <InputLabel id="family-filter-label">Семья ОС</InputLabel>
            <Select
              labelId="family-filter-label"
              value={familyFilter}
              label="Семья ОС"
              onChange={(event: SelectChangeEvent<string>) => setFamilyFilter(event.target.value)}
            >
              {familyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="body2">Кол-во установок: от</Typography>
            <TextField size="small" type="number" value={usersMin} onChange={(e) => setUsersMin(e.target.value)} fullWidth />
            <Typography variant="body2">до</Typography>
            <TextField size="small" type="number" value={usersMax} onChange={(e) => setUsersMax(e.target.value)} fullWidth />
          </Box>

          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="body2">Доля рынка: от</Typography>
            <TextField size="small" type="number" inputProps={{ step: '0.1' }} value={shareMin} onChange={(e) => setShareMin(e.target.value)} fullWidth />
            <Typography variant="body2">до</Typography>
            <TextField size="small" type="number" inputProps={{ step: '0.1' }} value={shareMax} onChange={(e) => setShareMax(e.target.value)} fullWidth />
          </Box>

          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="body2">Доля в семье ОС: от</Typography>
            <TextField size="small" type="number" inputProps={{ step: '0.1' }} value={shareOSMin} onChange={(e) => setShareOSMin(e.target.value)} fullWidth />
            <Typography variant="body2">до</Typography>
            <TextField size="small" type="number" inputProps={{ step: '0.1' }} value={shareOSMax} onChange={(e) => setShareOSMax(e.target.value)} fullWidth />
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Сортировка
        </Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))' }}>
          {sortLevels.map((level, index) => (
            <Box key={index} sx={{ display: 'grid', gap: 1 }}>
              <Typography variant="body2">Уровень {index + 1}</Typography>
              <FormControl fullWidth size="small">
                <InputLabel id={`sort-field-label-${index}`}>Поле</InputLabel>
                <Select
                  labelId={`sort-field-label-${index}`}
                  value={level.field}
                  label="Поле"
                  onChange={(event: SelectChangeEvent<string>) => handleSortChange(index, 'field', event.target.value)}
                >
                  {sortFields.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      disabled={option.value !== 'none' && usedFields.includes(option.value as SortField) && level.field !== option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id={`sort-order-label-${index}`}>Порядок</InputLabel>
                <Select
                  labelId={`sort-order-label-${index}`}
                  value={level.order}
                  label="Порядок"
                  onChange={(event: SelectChangeEvent<string>) => handleSortChange(index, 'order', event.target.value)}
                  disabled={level.field === 'none'}
                >
                  <MenuItem value="asc">По возрастанию</MenuItem>
                  <MenuItem value="desc">По убыванию</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Диаграмма
        </Typography>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))', marginBottom: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="chart-type-label">Тип диаграммы</InputLabel>
            <Select
              labelId="chart-type-label"
              value={chartType}
              label="Тип диаграммы"
              onChange={(event: SelectChangeEvent<string>) => setChartType(event.target.value as ChartType)}
            >
              <MenuItem value="bar">Столбчатая</MenuItem>
              <MenuItem value="scatter">Точечная</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="group-by-label">Значения</InputLabel>
            <Select
              labelId="group-by-label"
              value={groupBy}
              label="Значения"
              onChange={(event: SelectChangeEvent<string>) => setGroupBy(event.target.value as GroupBy)}
            >
              <MenuItem value="family">Семья ОС</MenuItem>
              <MenuItem value="name">Название ОС</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="aggregation-label">Агрегация</InputLabel>
            <Select
              labelId="aggregation-label"
              value={aggregation}
              label="Агрегация"
              onChange={(event: SelectChangeEvent<string>) => setAggregation(event.target.value as Aggregation)}
            >
              <MenuItem value="sum">Сумма</MenuItem>
              <MenuItem value="average">Среднее</MenuItem>
            </Select>
          </FormControl>
          {chartType === 'bar' && (
            <FormControl fullWidth size="small">
              <InputLabel id="chart-metric-label">Метрика</InputLabel>
              <Select
                labelId="chart-metric-label"
                value={chartMetric}
                label="Метрика"
                onChange={(event: SelectChangeEvent<string>) => setChartMetric(event.target.value as MetricField)}
              >
                {metricOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {chartType === 'scatter' && (
            <>
              <FormControl fullWidth size="small">
                <InputLabel id="chart-x-label">Ось X</InputLabel>
                <Select
                  labelId="chart-x-label"
                  value={chartX}
                  label="Ось X"
                  onChange={(event: SelectChangeEvent<string>) => setChartX(event.target.value as MetricField)}
                >
                  {metricOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="chart-y-label">Ось Y</InputLabel>
                <Select
                  labelId="chart-y-label"
                  value={chartY}
                  label="Ось Y"
                  onChange={(event: SelectChangeEvent<string>) => setChartY(event.target.value as MetricField)}
                >
                  {metricOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Box>
        <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: '#f7f7f7' }}>{renderChart()}</Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, marginBottom: 2 }}>
        <Typography variant="h6">Таблица</Typography>
        <Typography variant="body2">Показано {pageData.length} из {sortedData.length} записей</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>ОС</TableCell>
              <TableCell>Кол-во установок</TableCell>
              <TableCell>Доля использования</TableCell>
              <TableCell>Доля использования в семье ОС</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((item, index) => (
              <TableRow key={`${item.name}-${index}`} hover>
                <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.family}</TableCell>
                <TableCell>{item.users} млн</TableCell>
                <TableCell>{item.sharePercent}%</TableCell>
                <TableCell>{item.sharePercentOS}%</TableCell>
              </TableRow>
            ))}
            {pageData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                  Ничего не найдено по текущим фильтрам.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', marginBottom: 4 }}>
        <Button variant="outlined" size="small" onClick={() => setPage(1)} disabled={currentPage === 1}>
          Первая
        </Button>
        <Button variant="outlined" size="small" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Назад
        </Button>
        {renderPageButtons()}
        <Button variant="outlined" size="small" onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount}>
          Вперед
        </Button>
        <Button variant="outlined" size="small" onClick={() => setPage(pageCount)} disabled={currentPage === pageCount}>
          Последняя
        </Button>
      </Box>

      <Box sx={{ borderTop: '1px solid #ddd', padding: '20px', textAlign: 'center', backgroundColor: '#fafafa', marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          Тарасенко Т.В., Б9123-02.03.03тп/1
        </Typography>
      </Box>
    </Box>
  );
};

export default ListPage;
