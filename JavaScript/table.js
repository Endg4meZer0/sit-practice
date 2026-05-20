const showTable = (idTable, data) => {
    const table = d3.select("#" + idTable);
    table.selectAll("*").remove();

    const rows = table
        .selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .style("display", "");

    rows.selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);

    table
        .insert("tr", "tr")
        .selectAll("th")
        .data(Object.keys(data[0]))
        .enter()
        .append("th")
        .text(d => d);
};
