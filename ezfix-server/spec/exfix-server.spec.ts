import request = require("request-promise");
import Utils from "../schemas/utils";


var base_url = "http://localhost:3000";

describe("The server", () => {
    var server: any;

    beforeAll(() => { server = require('../ezfix-server') });

    afterAll(() => { server.closeServer() });

    it("adding a new message to chat service", () => {
        let options: any = {
            method: 'POST', uri: (base_url + "/chat/1"), body: {
                bytes : JSON.stringify({
                    type : 'message',
                    content: 'a new message teste'
                })
            }, json: true
        };

        return request.post(options).then((body : any) => {
                expect(body).toEqual({
                    "success" : "message added on chat service"
                });
            }).catch((error: any) => {
                expect(error).toEqual(null);
            });
    });

    it("failing in add a new message to chat service", () => {
        let options: any = {
            method: 'POST', uri: (base_url + "/chat/1"), body: {
                bytes : JSON.stringify({
                    type : 'message',
                    content: ''
                })
            }, json: true
        };

        return request.post(options).then((body : any) => {
                expect(body).toEqual({
                    "failure" : "message not added on chat service"
                });
            }).catch((error: any) => {
                expect(error).toEqual(null);
            });
    });

    it("testing if a needCensorship is working", () => {
        let text: string = "arrombado";
        let card: string = "5212345678901234";

        expect(Utils.needCensorship(text)).toEqual(true);
        expect(Utils.needCensorship(card)).toEqual(true);
    });
})