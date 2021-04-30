export class Card {
    cardName: string;
    cardNum: string;
    cvv: string;
    expiryMonth: number;
    expiryYear: number;

    constructor(cardName: string, cardNum: string, cvv: string, expiryMonth: number, expiryYear: number) {
        this.cardName = cardName;
        this.cardNum = cardNum;
        this.cvv = cvv;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
    }
}