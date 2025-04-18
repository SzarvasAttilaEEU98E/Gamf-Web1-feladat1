let data = [
    { name: "Kovács Anna", age: 25, city: "Budapest", job: "Tanár" },
    { name: "Szabó Péter", age: 30, city: "Debrecen", job: "Informatikus" },
    { name: "Tóth Eszter", age: 28, city: "Szeged", job: "Orvos" },
    { name: "Nagy László", age: 35, city: "Pécs", job: "Mérnök" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderTable(data);
    document.getElementById('addForm').addEventListener('submit', addRow);
    document.getElementById('filterName').addEventListener('input', filterTable);
    document.getElementById('filterAge').addEventListener('input', filterTable);
    document.getElementById('filterCity').addEventListener('input', filterTable);
    document.getElementById('filterJob').addEventListener('input', filterTable);
});

function validateInput(name, age, city, job) {
    if (name.length < 2 || name.length > 50) {
        alert("A név 2-50 karakter hosszú lehet!");
        return false;
    }
    if (isNaN(age) || age < 18 || age > 120) {
        alert("A kor 18 és 120 közötti szám legyen!");
        return false;
    }
    if (city.length < 2 || city.length > 50) {
        alert("A város 2-50 karakter hosszú lehet!");
        return false;
    }
    if (job.length < 2 || job.length > 50) {
        alert("A foglalkozás 2-50 karakter hosszú lehet!");
        return false;
    }
    return true;
}

function addRow(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const city = document.getElementById('city').value.trim();
    const job = document.getElementById('job').value.trim();

    if (validateInput(name, age, city, job)) {
        data.push({ name, age, city, job });
        renderTable(data);
        document.getElementById('addForm').reset();
    }
}

function updateRow(index) {
    const name = prompt("Adja meg az új nevet:", data[index].name);
    const age = parseInt(prompt("Adja meg az új kort:", data[index].age));
    const city = prompt("Adja meg az új várost:", data[index].city);
    const job = prompt("Adja meg az új foglalkozást:", data[index].job);

    if (name && age && city && job && validateInput(name, age, city, job)) {
        data[index] = { name, age, city, job };
        renderTable(data);
    }
}

function deleteRow(index) {
    if (confirm("Biztosan törli ezt a sort?")) {
        data.splice(index, 1);
        renderTable(data);
    }
}

function renderTable(dataToShow) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    dataToShow.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.city}</td>
            <td>${row.job}</td>
            <td>
                <button onclick="updateRow(${index})">Módosít</button>
                <button onclick="deleteRow(${index})">Töröl</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function sortTable(col) {
    data.sort((a, b) => {
        const valA = col === 1 ? a.age : a[Object.keys(a)[col]];
        const valB = col === 1 ? b.age : b[Object.keys(b)[col]];
        return typeof valA === 'number' ? valA - valB : valA.localeCompare(valB);
    });
    renderTable(data);
}

function filterTable() {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterAge = document.getElementById('filterAge').value;
    const filterCity = document.getElementById('filterCity').value.toLowerCase();
    const filterJob = document.getElementById('filterJob').value.toLowerCase();

    const filteredData = data.filter(row => 
        row.name.toLowerCase().includes(filterName) &&
        (filterAge === '' || row.age.toString().includes(filterAge)) &&
        row.city.toLowerCase().includes(filterCity) &&
        row.job.toLowerCase().includes(filterJob)
    );
    renderTable(filteredData);
}