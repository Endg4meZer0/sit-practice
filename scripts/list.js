const tbody = document.getElementById("tableBody");

// ФИЛЬТРЫ
let filters = {
    family: "all",
    users: [0, Infinity],
    sharePercent: [0, Infinity],
    sharePercentOS: [0, Infinity],
};

// СОРТИРОВКА (3 уровня)
let sortLevels = [
    { field: "none", order: "asc" },
    { field: "none", order: "asc" },
    { field: "none", order: "asc" }
];

// РЕНДЕР ТАБЛИЦЫ
function renderTable(data) {
    tbody.innerHTML = "";
    data.forEach((os, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${os.name.trim()}</td>
            <td>${os.family.trim()}</td>
            <td>${os.users} млн</td>
            <td>${os.sharePercent}%</td>
            <td>${os.sharePercentOS}%</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// ФИЛЬТРАЦИЯ
function filterData(data) {
    return data.filter(os => {
        const familyMatch = filters.family === "all" || os.family.trim() === filters.family;
        const usersMatch = os.users >= filters.users[0] && os.users <= filters.users[1];
        const sharePercentMatch = os.sharePercent >= filters.sharePercent[0] && os.sharePercent <= filters.sharePercent[1];
        const sharePercentOSMatch = os.sharePercentOS >= filters.sharePercentOS[0] && os.sharePercentOS <= filters.sharePercentOS[1];
        return familyMatch && usersMatch && sharePercentMatch && sharePercentOSMatch;
    });
}

// СОРТИРОВКА (ВСЕ 3 УРОВНЯ)
function sortData(data) {
    return [...data].sort((a, b) => {
        for (let i = 0; i < 3; i++) {
            const { field, order } = sortLevels[i];
            
            if (field !== "none") {
                let valA = a[field] ? a[field] : 0;
                let valB = b[field] ? b[field] : Infinity;
                
                let cmp = 0;
                if (valA > valB) cmp = 1;
                else if (valA < valB) cmp = -1;
                
                if (cmp !== 0) {
                    return order === "asc" ? cmp : -cmp;
                }
            }
        }
        return 0;
    });
}

// ОБНОВЛЕНИЕ ТАБЛИЦЫ
function updateTable() {
    let filtered = filterData(osData);
    let sorted = sortData(filtered);
    renderTable(sorted);
}

// БЛОКИРОВКА ПОВТОРНЫХ ПОЛЕЙ
function updateSortOptions() {
    const usedFields = sortLevels
        .filter(l => l.field !== "none")
        .map(l => l.field);
    
    for (let i = 0; i < 3; i++) {
        const select = document.getElementById(`sort${i + 1}Field`);
        if (!select) continue;
        
        const currentField = sortLevels[i].field;
        
        for (let opt of select.options) {
            if (opt.value !== "none" && opt.value !== currentField) {
                opt.disabled = usedFields.includes(opt.value);
            } else {
                opt.disabled = false;
            }
        }
    }
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener("DOMContentLoaded", () => {
    const filterFamily = document.getElementById("filterFamily");
    
    if (filterFamily) filterFamily.addEventListener("change", e => {
        filters.family = e.target.value;
        updateTable();
    });
    
    const filterUsers0 = document.getElementById("filterUsers0");
    const filterUsers1 = document.getElementById("filterUsers1");
    if (filterUsers0) filterUsers0.addEventListener("change", e => {
        let val = 0;
        if (!isNaN(Number(e.target.value)) && e.target.value.length > 0) val = Number(e.target.value);
        filters.users[0] = val;
        updateTable();
    });
    if (filterUsers1) filterUsers1.addEventListener("change", e => {
        let val = Infinity;
        if (!isNaN(Number(e.target.value)) && e.target.value.length > 0) val = Number(e.target.value);
        filters.users[1] = val;
        updateTable();
    });
    
    const filterSharePerc0 = document.getElementById("filterSharePerc0");
    const filterSharePerc1 = document.getElementById("filterSharePerc1");
    if (filterSharePerc0) filterSharePerc0.addEventListener("change", e => {
        let val = 0;
        if (!isNaN(Number(e.target.value)) && e.target.value.length > 0) val = Number(e.target.value);
        filters.sharePercent[0] = val;
        updateTable();
    });
    if (filterSharePerc1) filterSharePerc1.addEventListener("change", e => {
        let val = Infinity;
        if (!isNaN(Number(e.target.value)) && e.target.value.length > 0) val = Number(e.target.value);
        filters.sharePercent[1] = val;
        updateTable();
    });
    
    const filterSharePercOS0 = document.getElementById("filterSharePercOS0");
    const filterSharePercOS1 = document.getElementById("filterSharePercOS1");
    if (filterSharePercOS0) filterSharePercOS0.addEventListener("change", e => {
        let val = 0;
        if (!isNaN(Number(e.target.value)) && e.target.value.length > 0) val = Number(e.target.value);
        filters.sharePercentOS[0] = val;
        updateTable();
    });
    if (filterSharePercOS1) filterSharePercOS1.addEventListener("change", e => {
        let val = Infinity;
        if (!isNaN(Number(e.target.value)) && e.target.value.length > 0) val = Number(e.target.value);
        filters.sharePercentOS[1] = val;
        updateTable();
    });


    for (let i = 0; i < 3; i++) {
        const fieldSelect = document.getElementById(`sort${i + 1}Field`);
        const orderSelect = document.getElementById(`sort${i + 1}Order`);
        
        if (fieldSelect) fieldSelect.addEventListener("change", e => {
            sortLevels[i].field = e.target.value;
            updateSortOptions();
            updateTable();
        });
        
        if (orderSelect) orderSelect.addEventListener("change", e => {
            sortLevels[i].order = e.target.value;
            updateTable();
        });
    }

    updateSortOptions();
    updateTable();
});