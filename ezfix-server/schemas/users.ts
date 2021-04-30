import { Card } from "./card";

function checkCardMatch(card1: Card, card2: Card): Boolean {
    return (card1.cardName == card2.cardName
        && card1.cardNum == card2.cardNum
        && card1.cvv == card2.cvv
        && card1.expiryMonth == card2.expiryMonth
        && card1.expiryYear == card2.expiryYear);
}

export class Client {
    id: number;
    first_name: string;
    cards: Array<Card>;

    constructor(id: number, first_name: string) {
        this.id = id;
        this.first_name = first_name;
        this.cards = [];
    }

    saveCard(card: Card): Card {
        if (this.cards.find(el => checkCardMatch(el, card))) return null;

        this.cards.unshift(card);

        return card;
    }
}

export class ServiceProvider {
    id: number
    first_name: string;
    last_name: string;
    avatar_url?: string;
    description: string;
    evaluations_average: number;
    jobs_number: number;
    category: string;

    constructor(id: number, first_name: string, last_name: string, description: string, category: string, avatar_url?: string,) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.description = description;
        this.category = category;
        if (avatar_url) this.avatar_url = avatar_url;

        this.evaluations_average = 5.0;
        this.jobs_number = 0;
    }

    update_evaluation_average(new_grade: number) {
        this.evaluations_average = (this.evaluations_average + new_grade) / 2;
    }

    increase_jobs_number() {
        this.jobs_number++;
    }
}