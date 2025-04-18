// Web Storage
function saveStorage() {
    const input = document.getElementById('storageInput').value;
    if (input) {
        localStorage.setItem('savedText', input);
        document.getElementById('storageOutput').textContent = 'Mentve!';
    } else {
        alert('Írj be szöveget!');
    }
}

function loadStorage() {
    const saved = localStorage.getItem('savedText');
    document.getElementById('storageOutput').textContent = saved ? `Betöltött szöveg: ${saved}` : 'Nincs mentett szöveg.';
}

// Web Workers
function runWorker() {
    if (window.Worker) {
        const worker = new Worker('worker.js');
        worker.onmessage = function(e) {
            document.getElementById('workerOutput').textContent = `Eredmény: ${e.data}`;
        };
        worker.postMessage(10);
    } else {
        document.getElementById('workerOutput').textContent = 'A böngésző nem támogatja a Web Workers-t.';
    }
}

// Server-Sent Events (szimuláció)
function startSSE() {
    const output = document.getElementById('sseOutput');
    let count = 0;
    const interval = setInterval(() => {
        output.textContent += `Üzenet ${count}: Szimulált adat\n`;
        count++;
        if (count > 5) clearInterval(interval);
    }, 1000);
}

// Geolocation API
let map = null;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('geoOutput').textContent = `Szélesség: ${lat}, Hosszúság: ${lon}`;

                if (map) {
                    map.remove();
                }
                map = L.map('map').setView([lat, lon], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([lat, lon]).addTo(map)
                    .bindPopup('Itt vagy!')
                    .openPopup();
            },
            (error) => {
                document.getElementById('geoOutput').textContent = `Hiba: ${error.message}`;
            }
        );
    } else {
        document.getElementById('geoOutput').textContent = 'A böngésző nem támogatja a geolokációt.';
    }
}

// Drag and Drop API
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
    // Üzenet megjelenítése
    document.getElementById('dragOutput').textContent = 'Sikerült!';
}

function resetDragAndDrop() {
    const dragSource = document.getElementById('dragSource');
    const dragTarget = document.getElementById('dragTarget');
    const dragOutput = document.getElementById('dragOutput');
    const demoDiv = dragTarget.parentElement; // A .demo div, amely a szülő

    // A dragSource-t visszahelyezzük az eredeti pozícióba (a dragTarget elé)
    demoDiv.insertBefore(dragSource, dragTarget);
    // Töröljük az üzenetet
    dragOutput.textContent = '';
}

document.getElementById('dragSource').addEventListener('dragstart', handleDragStart);
document.getElementById('dragTarget').addEventListener('dragover', handleDragOver);
document.getElementById('dragTarget').addEventListener('drop', handleDrop);

// Canvas
const canvas = document.getElementById('canvasDemo');
const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();
ctx.stroke();