/*
  компонент для вывода строки таблицы
  props:
  row - данные для формирования ячеек строки таблицы в виде массива
  isHead - 0: формируются td, 1: формируются th
*/
const TableRow = (props) => {
  const Cell = props.isHead === '1' ? 'th' : 'td';

  return (
    <>
      {props.row.map((item, index) => (
        <Cell key={index}>{item}</Cell>
      ))}
    </>
  );
};

export default TableRow;
