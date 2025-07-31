import { Currency } from "./classes/currency.class.js";
import { Building } from "./classes/building.class.js";
import { BuildingsData } from "./data/buildings.data.js";


// Game class contains the global gamestate: currencies and such

class Game {
    constructor() {
        // GAME RULES
        this.tickRate = 1000 / 20;
        this.textIndex = 0;
        this.currentText = 0;

        // GAME VALUES
        this.baseClickPower = 1;

        // CURRENCIES
        this.dollars = new Currency('dollars');

        // GAME STATS
        this.stats = {
            allTimeClicks: 0,
            allTimedollars: 0,
            allTimeCharactersTyped: 0,
            allTimeMoneyProducedByBuildings: 0,
            allTimeMoneyProducedByClicking: 0,
        }

        this.productionPerTick = 0;

        // BUILDING LIST
        this.buildings = [];
        this.initBuildings();
    }
    produce(delta) {
        this.productionPerTick = 0;
        this.buildings.forEach(b => {
            b.checkAvailable();
            this.productionPerTick += b.production / 20;
        })
        this.dollars.amount += this.productionPerTick * delta;
        this.textIndex += this.productionPerTick * delta;
    }

    produceClick() {
        this.dollars.amount += this.clickPower;
        this.textIndex++;
    }

    initBuildings() {
        BuildingsData.forEach((data) => {
            const buildingInstance = new Building(data);
            this.buildings.push(buildingInstance);
        });
    }

    get clickPower() {
        return this.baseClickPower;
    }
}

export default new Game();