import { Buyable } from "./buyable.class.js";

export class Building extends Buyable {
    constructor({ id, name, shortName, description, perSecond, basePrice, currency, isUnique = false }) {
        super(basePrice, currency, isUnique);
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.perSecond = perSecond;
    }

    get production() {
        return this.perSecond * this.amount;
    }
}