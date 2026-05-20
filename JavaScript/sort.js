// Формирование массива настроек сортировки из формы
const createSortArr = (data) => {
  let sortArr = [];
  const sortSelects = data.getElementsByTagName('select');

  for (const item of sortSelects) {
    const keySort = item.value;

    // Если выбрана опция «Нет» — прекращаем формирование массива
    if (keySort == 0) break;

    // Порядок сортировки: имя флажка = имя SELECT + 'Desc'
    const desc = document.getElementById(item.id + 'Desc').checked;

    sortArr.push({
      column: keySort - 1,
      direction: desc
    });
  }

  return sortArr;
};

// Хранение «текущей» таблицы до сортировки
let tableBeforeSort = null;

// Сортировка таблицы по выбранным уровням
const sortTable = (idTable, formData) => {
  const sortArr = createSortArr(formData);
  let table = document.getElementById(idTable);

  // Если «Нет» во всех полях — восстанавливаем таблицу до сортировки
  if (sortArr.length === 0) {
    if (tableBeforeSort) {
      clearTable(idTable);
      tableBeforeSort.forEach(row => table.append(row));
      tableBeforeSort = null;
    }
    return false;
  }

  // Сохраняем строки таблицы до первой сортировки
  if (!tableBeforeSort) {
    tableBeforeSort = Array.from(table.childNodes).map(n => n.cloneNode(true));
  }

  let rowData = Array.from(table.rows);
  const headerRow = rowData.shift(); // убираем шапку

  // Ключи для определения числовых столбцов (Год и Высота)
  const numericColumns = [4, 5]; // индексы колонок Год и Высота

  rowData.sort((first, second) => {
    for (let { column, direction } of sortArr) {
      const firstVal = first.cells[column].innerHTML;
      const secondVal = second.cells[column].innerHTML;

      let comparison;
      if (numericColumns.includes(column)) {
        // Числовое сравнение для столбцов Год и Высота
        comparison = parseFloat(firstVal) - parseFloat(secondVal);
      } else {
        // Строковое сравнение с поддержкой локали
        comparison = firstVal.localeCompare(secondVal, 'ru');
      }

      if (comparison !== 0) {
        return direction ? -comparison : comparison;
      }
    }
    return 0;
  });

  // Выводим отсортированную таблицу
  table.innerHTML = '';
  table.append(headerRow);
  const tbody = document.createElement('tbody');
  rowData.forEach(item => tbody.append(item));
  table.append(tbody);
};

// Сброс сортировки
const resetSort = (idTable, data, sortForm) => {
  // Сбрасываем форму сортировки в исходное состояние
  setSortSelects(data[0], sortForm);

  // Восстанавливаем таблицу до сортировки
  if (tableBeforeSort) {
    const table = document.getElementById(idTable);
    clearTable(idTable);
    tableBeforeSort.forEach(row => table.append(row));
    tableBeforeSort = null;
  }
};
