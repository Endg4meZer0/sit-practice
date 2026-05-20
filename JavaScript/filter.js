// Соответствие между полями формы и столбцами таблицы
const correspond = {
  "Название": "structure",
  "Тип": "category",
  "Страна": "country",
  "Город": "city",
  "Год": ["yearFrom", "yearTo"],
  "Высота": ["heightFrom", "heightTo"]
};

// Получение данных из полей формы фильтра
const dataFilter = (dataForm) => {
  let dictFilter = {};

  for (const item of dataForm.elements) {
    let valInput = item.value;

    if (item.type === "text") {
      valInput = valInput.toLowerCase();
    }

    // Обработка числовых полей
    if (item.type === "number") {
      if (valInput !== "") {
        valInput = Number(valInput);
      } else if (item.id.includes("From")) {
        valInput = -Infinity;
      } else if (item.id.includes("To")) {
        valInput = +Infinity;
      }
    }

    dictFilter[item.id] = valInput;
  }

  return dictFilter;
};

// Фильтрация таблицы по данным формы
const filterTable = (data, idTable, dataForm) => {
  const datafilter = dataFilter(dataForm);

  let tableFilter = data.filter(item => {
    let result = true;

    Object.entries(item).map(([key, val]) => {
      // Текстовые поля — проверка на вхождение подстроки
      if (typeof val === 'string') {
        result &&= val.toLowerCase().includes(datafilter[correspond[key]]);
      }

      // Числовые поля — проверка принадлежности интервалу
      if (typeof val === 'number') {
        const [fromId, toId] = correspond[key];
        result &&= (val >= datafilter[fromId] && val <= datafilter[toId]);
      }
    });

    return result;
  });

  clearTable(idTable);
  createTable(tableFilter, idTable);
};

// Очистка фильтров и восстановление исходной таблицы
const clearFilter = (idTable, data, dataForm) => {
  // Сбрасываем поля формы
  dataForm.reset();

  // Сбрасываем сортировку
  const sortForm = document.getElementById('sort');
  if (sortForm) {
    setSortSelects(data[0], sortForm);
  }

  // Выводим исходную таблицу
  clearTable(idTable);
  createTable(data, idTable);
};
