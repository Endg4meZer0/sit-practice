import { useState } from "react";
import * as d3 from "d3";
import ChartDraw from "./ChartDraw.js";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("Точечная диаграмма");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOy = [
      event.target["oy"][0].checked,
      event.target["oy"][1].checked,
    ];

    if (!newOy[0] && !newOy[1]) {
      setError("Выберите хотя бы одно значение по оси OY");
      return;
    }

    setError("");
    setOx(event.target["ox"].value);
    setOy(newOy);
    setChartType(event.target["chartType"].value);
  };

  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, (d) => d[key]);
    let arrGraph = [];

    for (let entry of groupObj) {
      let minMax = d3.extent(entry[1].map((d) => d["Высота"]));

      arrGraph.push({
        labelX: entry[0],
        values: minMax,
      });
    }

    if (key === "Год") {
      arrGraph.sort((a, b) => Number(a.labelX) - Number(b.labelX));
    }

    return arrGraph;
  };

  return (
    <>
      <h4>Визуализация</h4>

      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>

        <div>
          <input
            type="radio"
            name="ox"
            value="Страна"
            defaultChecked={ox === "Страна"}
          />
          Страна
          <br />

          <input
            type="radio"
            name="ox"
            value="Год"
            defaultChecked={ox === "Год"}
          />
          Год
        </div>

        <p>Значение по оси OY</p>

        <div>
          <input type="checkbox" name="oy" defaultChecked={oy[0] === true} />
          Максимальная высота
          <br />

          <input type="checkbox" name="oy" defaultChecked={oy[1] === true} />
          Минимальная высота
        </div>

        <p>
          Тип диаграммы{" "}
          <select name="chartType" defaultValue={chartType}>
            <option value="Точечная диаграмма">Точечная диаграмма</option>
            <option value="Гистограмма">Гистограмма</option>
          </select>
        </p>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      {error && <p>{error}</p>}

      {!error && (
        <ChartDraw
          data={createArrGraph(props.data, ox)}
          oy={oy}
          chartType={chartType}
        />
      )}
    </>
  );
};

export default Chart;