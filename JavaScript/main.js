// Формирование одного элемента списка
const createOption = (str, val) => {
  const item = document.createElement('option');
  item.text = str;
  item.value = val;
  return item;
};

// Формирование поля со списком
const setSortSelect = (arr, sortSelect) => {
  sortSelect.innerHTML = '';
  sortSelect.append(createOption('Нет', 0));
  arr.forEach((item, index) => {
    sortSelect.append(createOption(item, index + 1));
  });
};

// Формирование полей со списком для двухуровневой сортировки
const setSortSelects = (data, dataForm) => {
  const head = Object.keys(data);
  let first = true;
  for (const item of dataForm.elements) {
    if (item.tagName === 'SELECT') {
      setSortSelect(head, item);
      item.disabled = !first;
      first = false;
    }
  }
};

// Настройка поля для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
  const nextSelect = document.getElementById(nextSelectId);
  nextSelect.disabled = false;
  nextSelect.innerHTML = curSelect.innerHTML;
  if (curSelect.value != 0) {
    nextSelect.remove(curSelect.value);
  } else {
    nextSelect.disabled = true;
  }
};

// ── Инициализация (скрипты в конце body, DOM уже готов) ──
const TABLE_ID   = 'list';
const filterForm = document.getElementById('filter');
const sortForm   = document.getElementById('sort');

// Выводим таблицу
createTable(buildings, TABLE_ID);

// Заполняем select-ы сортировки
setSortSelects(buildings[0], sortForm);

// При смене первого уровня — обновляем второй
document.getElementById('fieldsFirst').addEventListener('change', function () {
  changeNextSelect(this, 'fieldsSecond');
});

// Кнопка «Найти»
document.querySelector('#filter input[value="Найти"]').addEventListener('click', function () {
  tableBeforeSort = null;
  setSortSelects(buildings[0], sortForm);
  filterTable(buildings, TABLE_ID, filterForm);
});

// Кнопка «Очистить фильтры»
document.querySelector('#filter input[value="Очистить фильтры"]').addEventListener('click', function () {
  tableBeforeSort = null;
  clearFilter(TABLE_ID, buildings, filterForm);
});

// Кнопка «Сортировать»
document.querySelector('#sort input[value="Сортировать"]').addEventListener('click', function () {
  sortTable(TABLE_ID, sortForm);
});

// Кнопка «Сбросить сортировку»
document.querySelector('#sort input[value="Сбросить сортировку"]').addEventListener('click', function () {
  resetSort(TABLE_ID, buildings, sortForm);
});
