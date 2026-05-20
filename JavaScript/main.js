document.addEventListener("DOMContentLoaded", function () {
    const width = 600;
    const height = 600;

    d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const drawBtn = document.getElementById("drawBtn");
    const animateBtn = document.getElementById("animateBtn");
    const clearBtn = document.getElementById("clearBtn");
    const enableAnimation = document.getElementById("enableAnimation");
    const moveByPath = document.getElementById("moveByPath");

    drawBtn.addEventListener("click", draw);
    animateBtn.addEventListener("click", runAnimation);

    clearBtn.addEventListener("click", function () {
        d3.select("#canvas").selectAll("*").remove();
    });

    enableAnimation.addEventListener("change", updateFormView);
    moveByPath.addEventListener("change", updateFormView);

    updateFormView();
});

function draw() {
    const svg = d3.select("#canvas");

    const x = +document.getElementById("cx").value;
    const y = +document.getElementById("cy").value;
    const scaleX = +document.getElementById("scaleX").value;
    const scaleY = +document.getElementById("scaleY").value;
    const angle = +document.getElementById("angle").value;

    const pict = drawSmile(svg);

    pict.attr(
        "transform",
        `translate(${x}, ${y}) scale(${scaleX}, ${scaleY}) rotate(${angle})`
    );
}

function getEaseFunction(type) {
    if (type === "linear") return d3.easeLinear;
    if (type === "elastic") return d3.easeElastic;
    return d3.easeBounce;
}

function runAnimation() {
    const svg = d3.select("#canvas");

    const x1 = +document.getElementById("cx").value;
    const y1 = +document.getElementById("cy").value;
    const x2 = +document.getElementById("cx_finish").value;
    const y2 = +document.getElementById("cy_finish").value;

    const scaleX1 = +document.getElementById("scaleX").value;
    const scaleY1 = +document.getElementById("scaleY").value;
    const scaleX2 = +document.getElementById("scaleX_finish").value;
    const scaleY2 = +document.getElementById("scaleY_finish").value;

    const angle1 = +document.getElementById("angle").value;
    const angle2 = +document.getElementById("angle_finish").value;

    const easeType = document.getElementById("easeType").value;
    const moveByPath = document.getElementById("moveByPath").checked;

    const easeFunc = getEaseFunction(easeType);

    const pict = drawSmile(svg);

    if (!moveByPath) {
        pict.attr(
            "transform",
            `translate(${x1}, ${y1}) scale(${scaleX1}, ${scaleY1}) rotate(${angle1})`
        )
        .transition()
        .duration(6000)
        .ease(easeFunc)
        .attr(
            "transform",
            `translate(${x2}, ${y2}) scale(${scaleX2}, ${scaleY2}) rotate(${angle2})`
        );
    } else {
        const pathType = +document.getElementById("pathType").value;
        const path = drawPath(pathType);

        pict.transition()
            .duration(6000)
            .ease(d3.easeLinear)
            .attrTween("transform", translateAlong(path.node()));
    }
}

function updateFormView() {
    const enableAnimation = document.getElementById("enableAnimation").checked;
    const moveByPath = document.getElementById("moveByPath").checked;

    const drawBtn = document.getElementById("drawBtn");
    const animateBtn = document.getElementById("animateBtn");

    const coordsFinishBlock = document.getElementById("coordsFinishBlock");
    const scaleFinishBlock = document.getElementById("scaleFinishBlock");
    const rotateFinishBlock = document.getElementById("rotateFinishBlock");
    const easeLabel = document.getElementById("easeLabel");
    const pathBlock = document.getElementById("pathBlock");

    if (!enableAnimation) {
        drawBtn.classList.remove("hidden");
        animateBtn.classList.add("hidden");

        coordsFinishBlock.classList.add("hidden");
        scaleFinishBlock.classList.add("hidden");
        rotateFinishBlock.classList.add("hidden");
        easeLabel.classList.add("hidden");
        pathBlock.classList.add("hidden");
    } else {
        drawBtn.classList.add("hidden");
        animateBtn.classList.remove("hidden");

        coordsFinishBlock.classList.remove("hidden");
        scaleFinishBlock.classList.remove("hidden");
        rotateFinishBlock.classList.remove("hidden");
        easeLabel.classList.remove("hidden");

        if (moveByPath) {
            pathBlock.classList.remove("hidden");
        } else {
            pathBlock.classList.add("hidden");
        }
    }
}