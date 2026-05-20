document.addEventListener("DOMContentLoaded", function () {

    showTable("build", buildings);
    drawGraph(buildings, "Страна", true, false, "scatter");

    const btnToggle = document.getElementById("btnToggle");
    const table     = document.getElementById("build");

    btnToggle.addEventListener("click", function () {
        if (btnToggle.textContent === "Скрыть таблицу") {
            table.style.display   = "none";
            btnToggle.textContent = "Показать таблицу";
        } else {
            table.style.display   = "";
            btnToggle.textContent = "Скрыть таблицу";
        }
    });

    document.getElementById("btnBuild").addEventListener("click", function () {
        const keyX      = document.querySelector("input[name='axisX']:checked").value;
        const showMax   = document.getElementById("chkMax").checked;
        const showMin   = document.getElementById("chkMin").checked;
        const chartType = document.getElementById("chartType").value;
        const errMsg    = document.getElementById("errMsg");

        if (!showMax && !showMin) {
            errMsg.style.display = "block";
            return;
        }
        errMsg.style.display = "none";
        drawGraph(buildings, keyX, showMax, showMin, chartType);
    });
});
