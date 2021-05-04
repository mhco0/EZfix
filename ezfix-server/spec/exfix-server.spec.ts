import { json } from "body-parser";
import request = require("request-promise");

var base_url = "http://localhost:3000/";


describe("The server", () => {
    var server: any;

    beforeAll(() => { server = require('../ezfix-server') });

    afterAll(() => { server.closeServer() });

    it("initially return a list of service providers of category House Cleaning", () => {
        return request.get(base_url + "search/House")
            .then((body: any) => {
                expect(JSON.parse(body).length).toEqual(4)
            }
            )
            .catch((e: any) =>
                expect(e).toEqual(null)
            );
    })

    it("initially return a list of service providers of category Eletric Repair", () => {
        return request.get(base_url + "search/Eletric")
            .then((body: any) => {
                expect(JSON.parse(body).length).toEqual(1)
            }
            )
            .catch((e: any) =>
                expect(e).toEqual(null)
            );
    })

    it("initially return a list of service providers of category Plumbing", () => {
        return request.get(base_url + "search/Plumbing")
            .then((body: any) => {
                expect(JSON.parse(body).length).toEqual(1)
            }
            )
            .catch((e: any) =>
                expect(e).toEqual(null)
            );
    })


})