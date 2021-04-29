import axios from "axios"

const session = axios.create({
    baseURL: "https://api.test.paysafe.com",
});

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
    async auth_card(card) {
        var merchantRefNum = makeid(card.expirationM);
        console.log(typeof merchantRefNum);

        const data = {
            "merchantRefNum": "authonlydemo-161968851984928495495AAA",
            "amount": 10097,
            "settleWithAuth": true,
            "card": {
                "cardNum": 4111111111111111,
                "cardExpiry": {
                    "month": 2,
                    "year": 2027
                }
            },
            "billingDetails": {
                "street": "100 Queen Street West",
                "city": "Toronto",
                "state": "ON",
                "country": "CA",
                "zip": "M5H 2N2"
            }
        }

        return session.post("/cardpayments/v1/accounts/1002025870/auths", data, {
            headers: { "Content-Type": "application/json" }, auth: {
                username: "test_tmt2",
                password: "B-qa2-0-608a574b-0-302c0214766900f5b2b6c481b889258bb1c34ca936fa838802146eca9d5c5e26f2b07d27c27f45f922b8430fe5f3"
            }
        });

    },
};