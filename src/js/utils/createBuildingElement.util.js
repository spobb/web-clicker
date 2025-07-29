import { Currencies } from "../enum/currency.enum.js";

export function createBuildingElement(building) {
    const element = document.createElement('div');

    const counterWrapper = document.createElement('div');
    const priceWrapper = document.createElement('div');

    const counterElement = document.createElement('span');
    const priceElement = document.createElement('span');

    element.classList.add('building');
    element.id = building.id;

    counterElement.classList.add('counter-display');
    priceElement.classList.add('price-display');

    counterElement.textContent = building.amount;
    priceElement.textContent = building.price;

    counterWrapper.appendChild(counterElement);
    counterWrapper.append(` ${building.name}`);

    priceWrapper.appendChild(priceElement);
    priceWrapper.append(` ${Currencies[building.currency]}`);

    element.appendChild(counterWrapper);
    element.appendChild(priceWrapper);

    return element;
}