import { useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

/*
  компонент, выводящий на страницу таблицу с фильтрацией и пагинацией
  props:
  data - данные для таблицы в виде массива объектов
  amountRows - количество строк на странице
  usePagination - true/false, выводить ли блок пагинации
*/
const Table = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);

  const amountRows = Number(props.amountRows);
  const usePagination = props.usePagination === true || props.usePagination === 'true';
  const pagesCount = Math.ceil(dataTable.length / amountRows);
  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  const updateDataTable = (value) => setDataTable(value);
  const resetPage = () => setActivePage(1);

  const changeActive = (event) => {
    setActivePage(Number(event.target.textContent));
  };

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} fullData={props.data} resetPage={resetPage} />

      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={amountRows}
          numPage={activePage}
          usePagination={usePagination}
        />
      </table>

      {dataTable.length === 0 && <p className="empty">Нет данных по заданным фильтрам</p>}

      {usePagination && pagesCount > 1 && (
        <div className="pagination">
          {pages.map((item) => (
            <span
              key={item}
              onClick={changeActive}
              className={activePage === item ? 'activePage' : ''}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Table;
