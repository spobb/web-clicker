import { Buyable } from "./buyable.class.js";

export class Upgrade extends Buyable {
    constructor({ id, name, description, basePrice, currency }) {
        super(basePrice, currency);
        this.id = id;
        this.name = name;
        this.description = description;
        this.elementReference;
        this.isBought = false;
    }

    get production() {
        return this.perSecond * this.amount;
    }
}