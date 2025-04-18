class Animal {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    move() {
        return `${this.name} (${this.type}) mozog.`;
    }
}

class Bird extends Animal {
    constructor(name) {
        super(name, "Madár");
    }

    move() {
        return `${super.move()} Repül!`;
    }
}

class Fish extends Animal {
    constructor(name) {
        super(name, "Hal");
    }

    move() {
        return `${super.move()} Úszik!`;
    }
}

// Állatok létrehozása
const bird = new Bird("Sas");
const fish = new Fish("Ponty");

// Mozgás megjelenítése
function showMovement(animal) {
    const movementOutput = document.getElementById('movementOutput');
    
    // Új <p> elem létrehozása
    const p = document.createElement('p');
    p.textContent = animal.move();
    
    // A <p> elem hozzáadása a #movementOutput div-hez
    movementOutput.appendChild(p);
    
    // Demonstráljuk a document.body.appendChild használatát
    if (!document.body.contains(movementOutput)) {
        document.body.appendChild(movementOutput);
    }
}

// Mozgások törlése
function clearMovements() {
    const movementOutput = document.getElementById('movementOutput');
    movementOutput.innerHTML = ''; // Törli az összes gyermeket
}

// Gombok eseménykezelői
function showBirdMovement() {
    showMovement(bird);
}

function showFishMovement() {
    showMovement(fish);
}