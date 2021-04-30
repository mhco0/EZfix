import session from "./session"

function makeid(length) {
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

export default {
    async auth_card(card, client_id) {
        var merchantRefNum = makeid(Math.floor(Math.random() * 10) + 25);

        const body = {
            transationID: merchantRefNum,
            amount: 30,
            card: {
                cardName: card.cardHolder,
                cardNum: card.cardNumber,
                cvv: card.cvv,
                expiryMonth: card.expirationM,
                expiryYear: card.expirationY,
            },
            saveCard: card.saveCard
        }

        return session.post("/payment/" + client_id.toString(), body);
    },

    async get_cards_list(client_id) {
        return session.get("/cardslist/" + client_id.toString());
    }
};