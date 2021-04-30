import request = require("request-promise");

var base_url = "http://localhost:3000/";

var client_id = '1';

function makeid(length: number) {
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

describe("The server", () => {
    var server: any;

    beforeAll(() => { server = require('../ezfix-server') });

    afterAll(() => { server.closeServer() });

    it("initially return an empty cards list", () => {
        return request.get(base_url + "cardslist/" + client_id)
            .then((body: any) =>
                expect(body).toEqual('[]')
            )
            .catch((e: any) =>
                expect(e).toEqual(null)
            );
    })

    it("initially return an empty contracts list", () => {
        return request.get(base_url + "listcontracts/" + client_id)
            .then((body: any) =>
                expect(body).toEqual('[]')
            )
            .catch((e: any) =>
                expect(e).toEqual(null)
            );
    })

    it("declined a payment if the credit card information is wrong", () => {
        var merchantRefNum = makeid(Math.floor(Math.random() * 10) + 25);
        var options: any = {
            method: 'POST', uri: (base_url + "payment/" + client_id), body: {
                transationID: merchantRefNum,
                amount: 30,
                card: {
                    cardName: "Sergio Soares",
                    cardNum: "1111222233334444",
                    cvv: "102",
                    expiryMonth: 11,
                    expiryYear: 2025,
                },
                saveCard: true
            }, json: true
        };
        return request(options)
            .then((body: any) =>
                expect(body).toEqual({ failure: "Payment error" })
            ).catch((e: any) =>
                expect(e).toEqual(null)
            )
    });

    it("approve a payment if the credit card is valid", () => {
        var merchantRefNum = makeid(Math.floor(Math.random() * 10) + 25);
        var options: any = {
            method: 'POST', uri: (base_url + "payment/" + client_id), body: {
                transationID: merchantRefNum,
                amount: 30,
                card: {
                    cardName: "Sergio Soares",
                    cardNum: "1111222233334444",
                    cvv: "101",
                    expiryMonth: 11,
                    expiryYear: 2025,
                },
                saveCard: true
            }, json: true
        };
        return request(options)
            .then((body: any) =>
                expect(body).toEqual({ success: "Successful payment" })
            ).catch((e: any) =>
                expect(e).toEqual(null)
            )
    });

    it("can't update a service that not exist", () => {

        var options: any = {
            method: 'POST', uri: (base_url + "updateservice/1"), body: {
                "payment_status": true,
                "payment_online": true
            }, json: true
        };
        return request(options)
            .then((body: any) =>
                expect(body).toEqual({ failure: "Error updating service" })
            ).catch((e: any) =>
                expect(e).toEqual(null)
            )
    });

    it("can update a service that exist", () => {
        var service = {
            "json": {
                "client_id": client_id,
                "service_provider_id": 1,
                "payment_status": false,
                "payment_online": false
            }
        }

        var serviceUpdate = { "json": { "payment_status": true, "payment_online": true } }

        return request.post(base_url + "service/1", service)
            .then((body: any) => {
                expect(body).toEqual({ success: "Successful service create" })
                return request.post(base_url + "updateservice/1", serviceUpdate)
                    .then((body: any) =>
                        expect(body).toEqual({ success: "Successful service update" })
                    ).catch((e: any) =>
                        expect(e).toEqual(null)
                    )
            }).catch((e: any) =>
                expect(e).toEqual(null)
            )
    });



})