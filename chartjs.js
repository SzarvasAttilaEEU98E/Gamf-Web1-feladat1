// Eladási adatok (5 üzlet, 5 hónap: 2024 Január-Május)
const salesData = [
    { store: "Budapest", sales: [120, 150, 180, 200, 220] },
    { store: "Debrecen", sales: [100, 60, 80, 100, 180] },
    { store: "Szeged", sales: [90, 110, 150, 100, 270] },
    { store: "Pécs", sales: [80, 90, 100, 110, 120] },
    { store: "Győr", sales: [110, 140, 160, 170, 190] }
];

// Hónapok az X-tengelyhez
const months = ["Január", "Február", "Március", "Április", "Május"];

// Globális változó a diagramhoz
let chart = null;

// Táblázat renderelése
function renderTable() {
    const tbody = document.getElementById('salesTableBody');
    tbody.innerHTML = '';
    salesData.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.store}</td>
            <td>${row.sales[0]}</td>
            <td>${row.sales[1]}</td>
            <td>${row.sales[2]}</td>
            <td>${row.sales[3]}</td>
            <td>${row.sales[4]}</td>
            <td><button onclick="drawChartForRow(${index})">Ábrázolás</button></td>
        `;
        tbody.appendChild(tr);
    });
}

// Vonal diagram rajzolása egy adott sorhoz
function drawChartForRow(rowIndex) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Ha már van diagram, töröljük
    if (chart) {
        chart.destroy();
    }

    // Új diagram létrehozása
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months, // X-tengely: hónapok
            datasets: [{
                label: `Eladások - ${salesData[rowIndex].store}`,
                data: salesData[rowIndex].sales, // Y-tengely: az adott üzlet eladásai
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4 // Görbe simítása
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Eladások (db)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Hónap'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Havi eladási statisztika - ${salesData[rowIndex].store} (2024)`
                }
            }
        }
    });
}

// Táblázat inicializálása
renderTable();

// Alapértelmezett diagram (első sor: Budapest)
drawChartForRow(0);