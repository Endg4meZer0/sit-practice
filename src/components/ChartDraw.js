import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
  const chartRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    setWidth(parseFloat(svg.style("width")));
    setHeight(parseFloat(svg.style("height")));
  }, []);

  const margin = {
    top: 10,
    bottom: 60,
    left: 40,
    right: 10,
  };

  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  const arrValues = props.data.flatMap((d) => {
    let values = [];

    if (props.oy[0]) {
      values.push(d.values[1]);
    }

    if (props.oy[1]) {
      values.push(d.values[0]);
    }

    return values;
  });

  let [min, max] = d3.extent(arrValues);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(props.data.map((d) => d.labelX))
      .range([0, boundsWidth])
      .padding(0.1);
  }, [props.data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1])
      .range([boundsHeight, 0]);
  }, [boundsHeight, min, max]);

  useEffect(() => {
    if (width === 0 || height === 0) {
      return;
    }

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const xAxis = d3.axisBottom(scaleX);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    if (props.chartType === "Точечная диаграмма") {
      if (props.oy[0]) {
        svg
          .selectAll(".dotMax")
          .data(props.data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
          .attr("cy", (d) => scaleY(d.values[1]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", "red");
      }

      if (props.oy[1]) {
        svg
          .selectAll(".dotMin")
          .data(props.data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
          .attr("cy", (d) => scaleY(d.values[0]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", "blue");
      }
    }

    if (props.chartType === "Гистограмма") {
      const countBars = props.oy[0] && props.oy[1] ? 2 : 1;
      const barWidth = scaleX.bandwidth() / countBars;

      if (props.oy[0]) {
        svg
          .selectAll(".barMax")
          .data(props.data)
          .enter()
          .append("rect")
          .attr("x", (d) => scaleX(d.labelX))
          .attr("y", (d) => scaleY(d.values[1]))
          .attr("width", barWidth)
          .attr("height", (d) => boundsHeight - scaleY(d.values[1]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", "red");
      }

      if (props.oy[1]) {
        svg
          .selectAll(".barMin")
          .data(props.data)
          .enter()
          .append("rect")
          .attr("x", (d) => {
            if (props.oy[0]) {
              return scaleX(d.labelX) + barWidth;
            }

            return scaleX(d.labelX);
          })
          .attr("y", (d) => scaleY(d.values[0]))
          .attr("width", barWidth)
          .attr("height", (d) => boundsHeight - scaleY(d.values[0]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", "blue");
      }
    }
  }, [
    scaleX,
    scaleY,
    props.data,
    props.oy,
    props.chartType,
    width,
    height,
    boundsHeight,
  ]);

  return <svg ref={chartRef}></svg>;
};

export default ChartDraw;