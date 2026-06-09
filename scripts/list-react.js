const { createElement: e, useState, useMemo, useEffect } = React;

function App() {
  const sortFields = [
    { value: "none", label: "Нет" },
    { value: "users", label: "Кол-во установок" },
    { value: "sharePercent", label: "Доля использования" },
    { value: "sharePercentOS", label: "Доля использования в семье ОС" }
  ];

  const [family, setFamily] = useState("all");
  const [usersMin, setUsersMin] = useState("");
  const [usersMax, setUsersMax] = useState("");
  const [shareMin, setShareMin] = useState("");
  const [shareMax, setShareMax] = useState("");
  const [shareOSMin, setShareOSMin] = useState("");
  const [shareOSMax, setShareOSMax] = useState("");
  const [sortLevels, setSortLevels] = useState([
    { field: "none", order: "asc" },
    { field: "none", order: "asc" },
    { field: "none", order: "asc" }
  ]);
  const [page, setPage] = useState(1);
  const [chartType, setChartType] = useState("bar");
  const [groupBy, setGroupBy] = useState("family");
  const [chartMetric, setChartMetric] = useState("users");
  const [chartX, setChartX] = useState("users");
  const [chartY, setChartY] = useState("sharePercent");
  const [aggregation, setAggregation] = useState("sum");
  const pageSize = 8;

  const parseNumber = (value) => {
    if (value === "" || value === null || value === undefined) {
      return null;
    }
    const number = Number(value);
    return Number.isNaN(number) ? null : number;
  };

  const filters = useMemo(() => ({
    family,
    usersMin: parseNumber(usersMin),
    usersMax: parseNumber(usersMax),
    shareMin: parseNumber(shareMin),
    shareMax: parseNumber(shareMax),
    shareOSMin: parseNumber(shareOSMin),
    shareOSMax: parseNumber(shareOSMax)
  }), [family, usersMin, usersMax, shareMin, shareMax, shareOSMin, shareOSMax]);

  const filteredData = useMemo(() => {
    return osData.filter((item) => {
      if (filters.family !== "all" && item.family !== filters.family) {
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
  }, [filters]);

  const groupedData = useMemo(() => {
    const groups = {};
    filteredData.forEach((item) => {
      const key = item.family;
      if (!groups[key]) {
        groups[key] = {
          family: key,
          users: 0,
          sharePercent: 0,
          sharePercentOS: 0,
          count: 0
        };
      }
      groups[key].users += item.users;
      groups[key].sharePercent += item.sharePercent;
      groups[key].sharePercentOS += item.sharePercentOS;
      groups[key].count += 1;
    });
    return Object.values(groups);
  }, [filteredData]);

  const metricOptions = [
    { value: "users", label: "Кол-во установок" },
    { value: "sharePercent", label: "Доля использования" },
    { value: "sharePercentOS", label: "Доля использования в семье ОС" }
  ];

  const getMetricValue = (group, metric) => {
    if (aggregation === "average") {
      return group.count === 0 ? 0 : group[metric] / group.count;
    }
    return group[metric];
  };

  const chartData = useMemo(() => {
    if (groupedData.length === 0) {
      return [];
    }

    if (chartType === "bar") {
      return groupedData.map((group) => ({
        label: group.family,
        value: getMetricValue(group, chartMetric)
      }));
    }

    return groupedData.map((group) => ({
      label: group.family,
      x: getMetricValue(group, chartX),
      y: getMetricValue(group, chartY)
    }));
  }, [groupedData, chartType, chartMetric, chartX, chartY, aggregation]);

  const renderBarChart = () => {
    if (chartData.length === 0) {
      return e("p", null, "Нет данных для диаграммы.");
    }

    const width = 740;
    const height = 360;
    const padding = { top: 20, right: 20, bottom: 80, left: 70 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const maxValue = Math.max(...chartData.map((item) => item.value), 1);
    const barCount = chartData.length;
    const barStep = barCount ? innerWidth / barCount : innerWidth;
    const barWidth = Math.max(36, Math.min(80, barStep * 0.6));

    return e("svg", { width, height, viewBox: `0 0 ${width} ${height}` },
      e("g", { transform: `translate(${padding.left},${padding.top})` },
        e("line", { x1: 0, y1: 0, x2: 0, y2: innerHeight, stroke: "#68768d", strokeWidth: 1 }),
        e("line", { x1: 0, y1: innerHeight, x2: innerWidth, y2: innerHeight, stroke: "#68768d", strokeWidth: 1 }),
        Array.from({ length: 5 }, (_, index) => {
          const y = innerHeight - (innerHeight / 4) * index;
          const value = (maxValue / 4) * index;
          return e("g", { key: `y-tick-${index}` },
            e("line", { x1: 0, y1: y, x2: innerWidth, y2: y, stroke: "#e6e9f0", strokeWidth: 1 }),
            e("text", { x: -10, y: y + 4, textAnchor: "end", fontSize: 12, fill: "#333" }, value.toFixed(1))
          );
        }),
        chartData.map((item, index) => {
          const barHeight = (item.value / maxValue) * innerHeight;
          const x = index * barStep + (barStep - barWidth) / 2;
          const y = innerHeight - barHeight;
          return e("g", { key: item.label },
            e("rect", { x, y, width: barWidth, height: barHeight, fill: "#4f75f5", rx: 4 }),
            e("text", { x: x + barWidth / 2, y: y - 8, textAnchor: "middle", fontSize: 12, fill: "#1f2937" }, item.value.toFixed(1)),
            e("text", { x: x + barWidth / 2, y: innerHeight + 18, textAnchor: "middle", fontSize: 12, fill: "#222" }, item.label)
          );
        })
      )
    );
  };

  const renderScatterChart = () => {
    if (chartData.length === 0) {
      return e("p", null, "Нет данных для диаграммы.");
    }

    const width = 740;
    const height = 360;
    const padding = { top: 24, right: 24, bottom: 70, left: 70 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const xMax = Math.max(...chartData.map((item) => item.x), 1);
    const yMax = Math.max(...chartData.map((item) => item.y), 1);

    const xScale = (value) => (value / xMax) * innerWidth;
    const yScale = (value) => innerHeight - (value / yMax) * innerHeight;

    return e("svg", { width, height, viewBox: `0 0 ${width} ${height}` },
      e("g", { transform: `translate(${padding.left},${padding.top})` },
        e("line", { x1: 0, y1: 0, x2: 0, y2: innerHeight, stroke: "#68768d", strokeWidth: 1 }),
        e("line", { x1: 0, y1: innerHeight, x2: innerWidth, y2: innerHeight, stroke: "#68768d", strokeWidth: 1 }),
        Array.from({ length: 5 }, (_, index) => {
          const x = (innerWidth / 4) * index;
          const xValue = (xMax / 4) * index;
          return e("g", { key: `x-grid-${index}` },
            e("line", { x1: x, y1: 0, x2: x, y2: innerHeight, stroke: "#e6e9f0", strokeWidth: 1 }),
            e("text", { x, y: innerHeight + 18, textAnchor: "middle", fontSize: 12, fill: "#333" }, xValue.toFixed(1))
          );
        }),
        Array.from({ length: 5 }, (_, index) => {
          const y = innerHeight - (innerHeight / 4) * index;
          const yValue = (yMax / 4) * index;
          return e("g", { key: `y-grid-${index}` },
            e("line", { x1: 0, y1: y, x2: innerWidth, y2: y, stroke: "#e6e9f0", strokeWidth: 1 }),
            e("text", { x: -10, y: y + 4, textAnchor: "end", fontSize: 12, fill: "#333" }, yValue.toFixed(1))
          );
        }),
        chartData.map((item) => {
          const x = xScale(item.x);
          const y = yScale(item.y);
          return e("g", { key: item.label },
            e("circle", { cx: x, cy: y, r: 7, fill: "#4f75f5" }),
            e("text", { x: x + 12, y: y - 10, fontSize: 12, fill: "#1f2937" }, item.label)
          );
        }),
        e("text", { x: innerWidth / 2, y: innerHeight + 50, textAnchor: "middle", fontSize: 14, fill: "#222" }, metricOptions.find((option) => option.value === chartX)?.label || chartX),
        e("text", { x: -50, y: innerHeight / 2, textAnchor: "middle", fontSize: 14, fill: "#222", transform: `rotate(-90 -50 ${innerHeight / 2})` }, metricOptions.find((option) => option.value === chartY)?.label || chartY)
      )
    );
  };

  const renderChart = () => {
    if (chartType === "bar") {
      return renderBarChart();
    }
    return renderScatterChart();
  };

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      for (let level of sortLevels) {
        if (level.field === "none") {
          continue;
        }
        const valueA = a[level.field] ?? 0;
        const valueB = b[level.field] ?? 0;
        if (valueA === valueB) {
          continue;
        }
        return level.order === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }, [filteredData, sortLevels]);

  useEffect(() => {
    setPage(1);
  }, [filteredData, sortLevels]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, pageCount);

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [page, currentPage]);

  const pageData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const usedFields = sortLevels.filter((level) => level.field !== "none").map((level) => level.field);

  const handleSortChange = (index, key, value) => {
    setSortLevels((prev) => prev.map((item, idx) => idx === index ? { ...item, [key]: value } : item));
  };

  const renderPageButtons = () => {
    const pages = Array.from({ length: pageCount }, (_, idx) => idx + 1);
    return pages.map((pageNum) =>
      e("button", {
        key: pageNum,
        type: "button",
        className: pageNum === currentPage ? "active" : "",
        onClick: () => setPage(pageNum)
      }, pageNum)
    );
  };

  return e("main", null,
    e("section", { className: "section" },
      e("h1", null, "Рейтинг операционных систем"),
      e("p", null, "Фильтрация, сортировка и таблица с пагинацией.")
    ),
    e("section", { className: "section" },
      e("h2", null, "Фильтр"),
      e("div", { className: "controls" },
        e("div", { className: "control" },
          e("label", null,
            "Семья ОС",
            e("select", { value: family, onChange: (e) => setFamily(e.target.value) },
              e("option", { value: "all" }, "Все"),
              e("option", { value: "Windows" }, "Windows"),
              e("option", { value: "macOS" }, "macOS"),
              e("option", { value: "Linux" }, "Linux")
            )
          )
        ),
        e("div", { className: "control" },
          e("label", null,
            "Кол-во установок: от",
            e("input", {
              type: "number",
              min: "0",
              value: usersMin,
              onChange: (e) => setUsersMin(e.target.value)
            })
          ),
          e("label", null,
            "до",
            e("input", {
              type: "number",
              min: "0",
              value: usersMax,
              onChange: (e) => setUsersMax(e.target.value)
            })
          )
        ),
        e("div", { className: "control" },
          e("label", null,
            "Доля рынка: от",
            e("input", {
              type: "number",
              min: "0",
              step: "0.1",
              value: shareMin,
              onChange: (e) => setShareMin(e.target.value)
            })
          ),
          e("label", null,
            "до",
            e("input", {
              type: "number",
              min: "0",
              step: "0.1",
              value: shareMax,
              onChange: (e) => setShareMax(e.target.value)
            })
          )
        ),
        e("div", { className: "control" },
          e("label", null,
            "Доля в семье ОС: от",
            e("input", {
              type: "number",
              min: "0",
              step: "0.1",
              value: shareOSMin,
              onChange: (e) => setShareOSMin(e.target.value)
            })
          ),
          e("label", null,
            "до",
            e("input", {
              type: "number",
              min: "0",
              step: "0.1",
              value: shareOSMax,
              onChange: (e) => setShareOSMax(e.target.value)
            })
          )
        )
      )
    ),
    e("section", { className: "section" },
      e("h2", null, "Сортировка"),
      e("div", { className: "controls" },
        sortLevels.map((level, index) =>
          e("div", { key: index, className: "control" },
            e("label", null,
              "Уровень " + (index + 1),
              e("select", {
                value: level.field,
                onChange: (e) => handleSortChange(index, "field", e.target.value)
              },
                sortFields.map((field) =>
                  e("option", {
                    key: field.value,
                    value: field.value,
                    disabled: field.value !== level.field && field.value !== "none" && usedFields.includes(field.value)
                  }, field.label)
                )
              )
            ),
            e("label", null,
              "Порядок",
              e("select", {
                value: level.order,
                onChange: (e) => handleSortChange(index, "order", e.target.value),
                disabled: level.field === "none"
              },
                e("option", { value: "asc" }, "По возрастанию"),
                e("option", { value: "desc" }, "По убыванию")
              )
            )
          )
        )
      )
    ),
    e("section", { className: "section" },
      e("h2", null, "Диаграмма"),
      e("div", { className: "chart-form" },
        e("div", { className: "control" },
          e("label", null,
            "Тип диаграммы",
            e("select", { value: chartType, onChange: (e) => setChartType(e.target.value) },
              e("option", { value: "bar" }, "Столбчатая"),
              e("option", { value: "scatter" }, "Точечная")
            )
          )
        ),
        e("div", { className: "control" },
          e("label", null,
            "Группировка",
            e("select", { value: groupBy, onChange: (e) => setGroupBy(e.target.value) },
              e("option", { value: "family" }, "Семья ОС")
            )
          )
        ),
        e("div", { className: "control" },
          e("label", null,
            "Агрегация",
            e("select", { value: aggregation, onChange: (e) => setAggregation(e.target.value) },
              e("option", { value: "sum" }, "Сумма"),
              e("option", { value: "average" }, "Среднее")
            )
          )
        ),
        chartType === "bar" && e("div", { className: "control" },
          e("label", null,
            "Метрика",
            e("select", { value: chartMetric, onChange: (e) => setChartMetric(e.target.value) },
              metricOptions.map((field) =>
                e("option", { key: field.value, value: field.value }, field.label)
              )
            )
          )
        ),
        chartType === "scatter" && e("div", { className: "control" },
          e("label", null,
            "Ось X",
            e("select", { value: chartX, onChange: (e) => setChartX(e.target.value) },
              metricOptions.map((field) =>
                e("option", { key: field.value, value: field.value }, field.label)
              )
            )
          )
        ),
        chartType === "scatter" && e("div", { className: "control" },
          e("label", null,
            "Ось Y",
            e("select", { value: chartY, onChange: (e) => setChartY(e.target.value) },
              metricOptions.map((field) =>
                e("option", { key: field.value, value: field.value }, field.label)
              )
            )
          )
        )
      ),
      e("div", { className: "chart-card" },
        e("div", { className: "chart-meta" },
          e("p", null, `Статус: выбрана ${chartType === "bar" ? "столбчатая" : "точечная"} диаграмма, метрика: ${chartType === "bar" ? metricOptions.find((field) => field.value === chartMetric)?.label : `${metricOptions.find((field) => field.value === chartX)?.label} и ${metricOptions.find((field) => field.value === chartY)?.label}`}`),
          e("p", null, `Группировка по: ${groupBy === "family" ? "семье ОС" : groupBy}`)
        ),
        e("div", { className: "chart-container" }, renderChart())
      )
    ),
    e("section", { className: "section" },
      e("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px"
        }
      },
        e("h2", null, "Таблица"),
        e("div", null, `Показано ${pageData.length} из ${sortedData.length} записей`)
      ),
      e("table", null,
        e("thead", null,
          e("tr", null,
            e("th", null, "#"),
            e("th", null, "Название"),
            e("th", null, "ОС"),
            e("th", null, "Кол-во установок"),
            e("th", null, "Доля использования"),
            e("th", null, "Доля использования в семье ОС")
          )
        ),
        e("tbody", null,
          pageData.map((item, index) =>
            e("tr", { key: item.name + index },
              e("td", null, (currentPage - 1) * pageSize + index + 1),
              e("td", null, item.name),
              e("td", null, item.family),
              e("td", null, `${item.users} млн`),
              e("td", null, `${item.sharePercent}%`),
              e("td", null, `${item.sharePercentOS}%`)
            )
          )
        )
      ),
      e("div", { className: "pagination" },
        e("button", {
          type: "button",
          onClick: () => setPage(1),
          disabled: currentPage === 1
        }, "Первая"),
        e("button", {
          type: "button",
          onClick: () => setPage((prev) => Math.max(prev - 1, 1)),
          disabled: currentPage === 1
        }, "Назад"),
        ...renderPageButtons(),
        e("button", {
          type: "button",
          onClick: () => setPage((prev) => Math.min(prev + 1, pageCount)),
          disabled: currentPage === pageCount
        }, "Вперед"),
        e("button", {
          type: "button",
          onClick: () => setPage(pageCount),
          disabled: currentPage === pageCount
        }, "Последняя")
      )
    ),
    e("footer", null,
      e("hr", null),
      e("p", null, "Тарасенко Т.В., Б9123-02.03.03тп/1")
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(e(App, null));
