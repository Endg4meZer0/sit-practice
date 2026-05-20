import TableRow from './TableRow.js';

/*
  компонент для вывода tbody таблицы
  props:
  body - данные для таблицы в виде массива объектов
  numPage - номер текущей страницы
  amountRows - количество строк таблицы на странице
  usePagination - признак наличия пагинации
*/
const TableBody = (props) => {
  const amountRows = Number(props.amountRows);
  const numPage = Number(props.numPage);
  const begRange = (numPage - 1) * amountRows;
  const endRange = begRange + amountRows;

  const visibleRows = props.usePagination
    ? props.body.slice(begRange, endRange)
    : props.body;

  return (
    <tbody>
      {visibleRows.map((item, index) => (
        <tr key={index}>
          <TableRow row={Object.values(item)} isHead="0" />
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
