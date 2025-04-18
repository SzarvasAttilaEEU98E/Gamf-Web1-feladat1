const API_URL = 'http://gamf.nhely.hu/ajax2/';

// Validáció függvény
function validateInput(name, height, weight) {
    if (!name || !height || !weight) {
        return "Minden mező kitöltése kötelező!";
    }
    if (name.length > 30 || height.length > 30 || weight.length > 30) {
        return "A mezők maximum 30 karaktert tartalmazhatnak!";
    }
    return null;
}

// Code ellenőrzés
function getUserCode() {
    const code = document.getElementById('userCode').value;
    if (!code) {
        return null;
    }
    return code;
}

// Read - Összes rekord lekérése és statisztikák
function getAllRecords() {
    const code = getUserCode();
    const recordList = document.getElementById('recordList');
    const heightStats = document.getElementById('heightStats');

    if (!code) {
        recordList.textContent = 'Kérlek add meg a felhasználói kódot!';
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=read&code=${encodeURIComponent(code)}`
    })
        .then(response => response.json())
        .then(data => {
            recordList.innerHTML = '';
            heightStats.innerHTML = '';

            // Ellenőrizzük, hogy van-e list
            if (!data.list || data.list.length === 0) {
                recordList.textContent = 'Nincs rekord a megadott kódhoz.';
                return;
            }

            // Adatok kiírása egymás alá
            data.list.forEach(record => {
                const p = document.createElement('p');
                p.textContent = `ID: ${record.id}, Név: ${record.name}, Magasság: ${record.height}, Súly: ${record.weight}, Kód: ${record.code}`;
                recordList.appendChild(p);
            });

            // Height statisztikák (String -> Number konverzió)
            const heights = data.list.map(record => parseFloat(record.height)).filter(h => !isNaN(h));
            if (heights.length > 0) {
                const sum = heights.reduce((acc, val) => acc + val, 0);
                const average = sum / heights.length;
                const max = Math.max(...heights);

                heightStats.innerHTML = `
                    <p>Height statisztikák:</p>
                    <p>Összeg: ${sum.toFixed(2)}</p>
                    <p>Átlag: ${average.toFixed(2)}</p>
                    <p>Legnagyobb: ${max.toFixed(2)}</p>
                `;
            } else {
                heightStats.textContent = 'Nem található érvényes magasság adat.';
            }
        })
        .catch(error => {
            console.error('Hiba:', error);
            recordList.textContent = 'Hiba történt az adatok lekérésekor.';
        });
}

// Create - Új rekord létrehozása
function createRecord() {
    const code = getUserCode();
    const name = document.getElementById('createName').value;
    const height = document.getElementById('createHeight').value;
    const weight = document.getElementById('createWeight').value;
    const output = document.getElementById('createOutput');

    if (!code) {
        output.textContent = 'Kérlek add meg a felhasználói kódot!';
        return;
    }

    const validationError = validateInput(name, height, weight);
    if (validationError) {
        output.textContent = validationError;
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=create&name=${encodeURIComponent(name)}&height=${encodeURIComponent(height)}&weight=${encodeURIComponent(weight)}&code=${encodeURIComponent(code)}`
    })
        .then(response => response.json())
        .then(data => {
            if (data === 1) {
                output.textContent = 'Sikeres létrehozás!';
                getAllRecords(); // Frissítjük a listát
            } else {
                output.textContent = 'Nem sikerült a létrehozás!';
            }
        })
        .catch(error => {
            console.error('Hiba:', error);
            output.textContent = 'Hiba történt a létrehozás során.';
        });
}

// Update - Adatok lekérése ID alapján
function getDataForId() {
    const code = getUserCode();
    const id = document.getElementById('updateId').value;
    const output = document.getElementById('updateOutput');

    if (!code) {
        output.textContent = 'Kérlek add meg a felhasználói kódot!';
        return;
    }
    if (!id) {
        output.textContent = 'Kérlek add meg az ID-t!';
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=read&code=${encodeURIComponent(code)}`
    })
        .then(response => response.json())
        .then(data => {
            const record = data.list.find(r => r.id === id);
            if (record) {
                document.getElementById('updateName').value = record.name;
                document.getElementById('updateHeight').value = record.height;
                document.getElementById('updateWeight').value = record.weight;
                output.textContent = 'Adatok betöltve, módosíthatod!';
            } else {
                output.textContent = 'Nincs ilyen rekord a megadott ID-vel és kóddal!';
            }
        })
        .catch(error => {
            console.error('Hiba:', error);
            output.textContent = 'Hiba történt az adatok lekérésekor.';
        });
}

// Update - Rekord módosítása
function updateRecord() {
    const code = getUserCode();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const height = document.getElementById('updateHeight').value;
    const weight = document.getElementById('updateWeight').value;
    const output = document.getElementById('updateOutput');

    if (!code) {
        output.textContent = 'Kérlek add meg a felhasználói kódot!';
        return;
    }
    if (!id) {
        output.textContent = 'Kérlek add meg az ID-t!';
        return;
    }

    const validationError = validateInput(name, height, weight);
    if (validationError) {
        output.textContent = validationError;
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=update&id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&height=${encodeURIComponent(height)}&weight=${encodeURIComponent(weight)}&code=${encodeURIComponent(code)}`
    })
        .then(response => response.json())
        .then(data => {
            if (data === 1) {
                output.textContent = `Sikeres módosítás! ID: ${id}`;
                getAllRecords();
            } else {
                output.textContent = 'Nem sikerült a módosítás!';
            }
        })
        .catch(error => {
            console.error('Hiba:', error);
            output.textContent = 'Hiba történt a módosítás során.';
        });
}

// Delete - Rekord törlése
function deleteRecord() {
    const code = getUserCode();
    const id = document.getElementById('deleteId').value;
    const output = document.getElementById('deleteOutput');

    if (!code) {
        output.textContent = 'Kérlek add meg a felhasználói kódot!';
        return;
    }
    if (!id) {
        output.textContent = 'Kérlek add meg az ID-t!';
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `op=delete&id=${encodeURIComponent(id)}&code=${encodeURIComponent(code)}`
    })
        .then(response => response.json())
        .then(data => {
            if (data === 1) {
                output.textContent = `Sikeres törlés! ID: ${id}`;
                getAllRecords();
            } else {
                output.textContent = 'Nem sikerült a törlés!';
            }
        })
        .catch(error => {
            console.error('Hiba:', error);
            output.textContent = 'Hiba történt a törlés során.';
        });
}