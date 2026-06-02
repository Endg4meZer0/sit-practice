import React from "react";

const Table = ({ data, amountRows }) => {
  const rowsToShow = data.slice(0, amountRows);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Название</th>
          <th>Тип</th>
          <th>Страна</th>
          <th>Город</th>
          <th>Год</th>
          <th>Высота (м)</th>
        </tr>
      </thead>
      <tbody>
        {rowsToShow.map((building, index) => (
          <tr key={index}>
            <td>{building["Название"]}</td>
            <td>{building["Тип"]}</td>
            <td>{building["Страна"]}</td>
            <td>{building["Город"]}</td>
            <td>{building["Год"]}</td>
            <td>{building["Высота"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;