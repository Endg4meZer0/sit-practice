function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];

    for (let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d["Высота"]));
        arrGraph.push({ labelX: entry[0], values: minMax });
    }

    if (typeof arrGraph[0].labelX === "number") {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    return arrGraph;
}

function createAxis(svg, data, attr_area) {
    const allVals = data.flatMap(d => d.values);
    const [min, max] = d3.extent(allVals);

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.1);

    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    svg.append("g")
        .attr("transform",
            `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(d3.axisBottom(scaleX))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform",
            `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(d3.axisLeft(scaleY));

    return [scaleX, scaleY];
}

function createScatterChart(svg, data, scaleX, scaleY, attr_area, showMax, showMin) {
    const r = 4;
    const tx = `translate(${attr_area.marginX}, ${attr_area.marginY})`;

    if (showMax) {
        svg.selectAll(".dot-max")
            .data(data).enter()
            .append("circle")
            .attr("class", "dot-max")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", tx)
            .style("fill", "red");
    }

    if (showMin) {
        svg.selectAll(".dot-min")
            .data(data).enter()
            .append("circle")
            .attr("class", "dot-min")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[0]))
            .attr("transform", tx)
            .style("fill", "blue");
    }
}

function createBarChart(svg, data, scaleX, scaleY, attr_area, showMax, showMin) {
    const bw   = scaleX.bandwidth();
    const subW = (showMax && showMin) ? bw / 2 : bw;
    const yBase = attr_area.height - 2 * attr_area.marginY;
    const tx = `translate(${attr_area.marginX}, ${attr_area.marginY})`;

    data.forEach(d => {
        const x0 = scaleX(d.labelX);

        if (showMax) {
            const yPx = scaleY(d.values[1]);
            svg.append("rect")
                .attr("x", x0)
                .attr("y", yPx)
                .attr("width", subW - 1)
                .attr("height", yBase - yPx)
                .attr("transform", tx)
                .style("fill", "red");
        }

        if (showMin) {
            const yPx = scaleY(d.values[0]);
            svg.append("rect")
                .attr("x", x0 + (showMax ? subW : 0))
                .attr("y", yPx)
                .attr("width", subW - 1)
                .attr("height", yBase - yPx)
                .attr("transform", tx)
                .style("fill", "blue");
        }
    });
}

function drawGraph(data, keyX, showMax, showMin, chartType) {
    const arrGraph = createArrGraph(data, keyX);

    const svg = d3.select("#chart-svg");
    svg.selectAll("*").remove();

    const svgEl = document.getElementById("chart-svg");
    const attr_area = {
        width:   svgEl.clientWidth  || 860,
        height:  svgEl.clientHeight || 360,
        marginX: 55,
        marginY: 40
    };

    const [scX, scY] = createAxis(svg, arrGraph, attr_area);

    if (chartType === "scatter") {
        createScatterChart(svg, arrGraph, scX, scY, attr_area, showMax, showMin);
    } else {
        createBarChart(svg, arrGraph, scX, scY, attr_area, showMax, showMin);
    }
}
