import Game from './game.js';
import { createBuildingElement } from './utils/createBuildingElement.util.js';
import { writeToCanvas } from './utils/write.util.js';

// Main game logic

const htmlTagDisplay = document.getElementById('html-tag-display');
const clickerButton = document.getElementById('clicker-button');
const buildingListElement = document.querySelector('.building-list');

let buildingElements = [];

clickerButton.addEventListener('click', (e) => {
    Game.produceClick();
})

// game loop

let deltaTime = 0;
let lastTime = 0;
let tickDelta = 0;

function update(time) {
    requestAnimationFrame(update);
    deltaTime = (time - lastTime);
    lastTime = time;

    tickDelta = deltaTime / Game.tickRate;
    Game.produce(tickDelta);

    draw();
}

function draw() {
    htmlTagDisplay.innerText = Math.floor(Game.dollars.amount);

    writeToCanvas(Game.textIndex);
}

async function initDisplay() {
    Game.buildings.forEach(building => {
        const el = createBuildingElement(building);
        buildingListElement.appendChild(el);
        buildingElements.push(el);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await initDisplay();
    buildingElements.forEach(el => {
        el.addEventListener('click', (e) => {
            const buildingClass = Game.buildings.find(b => b.id == el.id);

            buildingClass.buy(1);

            const counterDisplay = el.querySelector('.counter-display');
            const priceDisplay = el.querySelector('.price-display');
            counterDisplay.innerText = buildingClass.amount;
            priceDisplay.innerText = buildingClass.price;
        })
    })

    requestAnimationFrame(update);
})