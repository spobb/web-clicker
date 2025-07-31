import Game from '../game.js';

export class Buyable {
    constructor(basePrice, currency) {
        this.currency = currency;
        this.basePrice = basePrice;
        this.price = basePrice;
        this.amount = 0;
    }

    buy(amount) {
        if (this.price > Game.dollars.amount) {
            return;
        }
        Game.dollars.amount -= this.price;
        this.amount += amount;

        this.scalePrice();
    }

    buyMax() {
        if (this.isUnique && this.amount >= 1) {
            return;
        }
        const canBuyAmount = Math.floor(Game.dollars.amount / this.price);

        Game.dollars.amount -= this.price * canBuyAmount;
        this.amount += canBuyAmount;
    }

    scalePrice() {
        this.price = Math.floor(this.basePrice * 1.15 ** this.amount);
    }

    checkAvailable() {
        return Game[this.currency].amount >= this.price;
    }
}