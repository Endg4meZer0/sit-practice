// Создание и вывод таблицы на страницу
const createTable = (data, idTable) => {
  const table = document.getElementById(idTable);
  const header = Object.keys(data[0] || {});

  // создание шапки таблицы
  const headerRow = createHeaderRow(header);
  table.append(headerRow);

  if (data.length === 0) return; // если данных нет — только шапка

  // создание тела таблицы
  const bodyRows = createBodyRows(data);
  table.append(bodyRows);
};

// Формирование строки заголовка таблицы
const createHeaderRow = (headers) => {
  const tr = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.innerHTML = header;
    tr.append(th);
  });
  return tr;
};

// Формирование тела таблицы
const createBodyRows = (data) => {
  const tbody = document.createElement('tbody');

  data.forEach(item => {
    const tr = document.createElement('tr');

    Object.values(item).forEach(val => {
      const td = document.createElement('td');
      td.innerHTML = val;
      tr.append(td);
    });

    tbody.append(tr);
  });

  return tbody;
};

// Очистка таблицы (удаление всех строк)
const clearTable = (idTable) => {
  const table = document.getElementById(idTable);
  table.innerHTML = '';
};
