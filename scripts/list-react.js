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
