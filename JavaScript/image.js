function drawSmile(svg) {
    let smile = svg.append("g")
        .style("stroke", "brown")
        .style("stroke-width", 2)
        .style("fill", "brown");

    smile.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "yellow");

    smile.append("circle")
        .attr("cx", -20)
        .attr("cy", -10)
        .attr("r", 5);

    smile.append("circle")
        .attr("cx", 20)
        .attr("cy", -10)
        .attr("r", 5);

    const arc = d3.arc()
        .innerRadius(35)
        .outerRadius(35);

    smile.append("path")
        .attr("d", arc({
            startAngle: Math.PI / 3 * 2,
            endAngle: Math.PI / 3 * 4
        }))
        .style("stroke", "brown")
        .style("fill", "none");

    return smile;
}