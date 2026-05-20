// создаем массив точек, расположенных буквой "Г"
function createPathG() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    let data = [];
    const padding = 100;

    let posX = padding;
    let posY = height - padding;
    const step = 5;

    // вверх
    while (posY > padding) {
        data.push({ x: posX, y: posY });
        posY -= step;
    }

    // вправо
    while (posX < width - padding) {
        data.push({ x: posX, y: posY });
        posX += step;
    }

    return data;
}

// создаем массив точек по кругу
function createPathCircle() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    let data = [];

    for (let t = 0; t <= Math.PI * 2; t += 0.1) {
        data.push({
            x: width / 2 + (width / 3) * Math.sin(t),
            y: height / 2 + (height / 3) * Math.cos(t)
        });
    }

    return data;
}

// рисуем путь
function drawPath(typePath) {
    const svg = d3.select("svg");
    const dataPoints = typePath === 0 ? createPathG() : createPathCircle();

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);

    const path = svg.append("path")
        .attr("d", line(dataPoints))
        .attr("stroke", "none")   // путь не показываем
        .attr("fill", "none");

    return path;
}

// движение вдоль пути
function translateAlong(path) {
    const length = path.getTotalLength();

    return function () {
        return function (t) {
            const point = path.getPointAtLength(t * length);
            return `translate(${point.x}, ${point.y})`;
        };
    };
}