export class Currency {
    constructor(name, baseAmount = 0) {
        this.name = name;
        this.amount = baseAmount;
        this.perTick = 0;
    }
}