const vizToggle = document.getElementById("vizToggle");
const vizPanel = document.getElementById("vizPanel");

const chartType = document.getElementById("chartType");
const xField = document.getElementById("xField");
const yField = document.getElementById("yField");

const svg = d3.select("#vizChart");

const width = 900;
const height = 500;
const margin = {
    top: 40,
    right: 40,
    bottom: 80,
    left: 80
};
const familyColors = {
    "Windows": "#4F81BD",
    "Linux": "#F2C811",
    "macOS": "#999999"
};

svg
    .attr("width", width)
    .attr("height", height);

vizToggle.addEventListener("click", () => {
    if (vizPanel.style.display === "none") {
        vizPanel.style.display = "block";
        vizToggle.textContent = "▲ Скрыть визуализацию";
        updateChart();
    } else {
        vizPanel.style.display = "none";
        vizToggle.textContent = "▼ Показать визуализацию";
    }
});

chartType.addEventListener("change", updateChart);
xField.addEventListener("change", updateChart);
yField.addEventListener("change", updateChart);

function updateChart() {

    svg.selectAll("*").remove();

    const xKey = xField.value;
    const yKey = yField.value;
    const type = chartType.value;

    const data = [...osData];

    const xValues = data.map(d => d[xKey]);
    const yValues = data.map(d => +d[yKey]);

    const xScale = d3
        .scaleBand()
        .domain(xValues)
        .range([margin.left, width - margin.right])
        .padding(0.2);

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(yValues)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .attr(
            "transform",
            `translate(0,${height - margin.bottom})`
        )
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-20)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left},0)`
        )
        .call(d3.axisLeft(yScale));

    if (type === "bar") {

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", d => familyColors[d.family])
            .attr("x", d => xScale(d[xKey]))
            .attr("y", d => yScale(d[yKey]))
            .attr("width", xScale.bandwidth())
            .attr(
                "height",
                d => height - margin.bottom - yScale(d[yKey])
            );
    }

    if (type === "line") {

        const line = d3.line()
            .x(d => xScale(d[xKey]) + xScale.bandwidth() / 2)
            .y(d => yScale(d[yKey]));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("d", line);

        svg.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill", d => familyColors[d.family])
            .attr("cx",
                d => xScale(d[xKey]) + xScale.bandwidth() / 2
            )
            .attr("cy",
                d => yScale(d[yKey])
            )
            .attr("r", 5);
    }

    if (type === "scatter") {

        svg.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("fill", d => familyColors[d.family])
            .attr("cx",
                d => xScale(d[xKey]) + xScale.bandwidth() / 2
            )
            .attr("cy",
                d => yScale(d[yKey])
            )
            .attr("r", 6);
    }

    document.getElementById("vizCount").textContent =
        `Элементов: ${data.length}`;
}