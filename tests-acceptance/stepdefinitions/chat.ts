import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by} from 'protractor';
import Utils from "./../../ezfix-server/schemas/utils";
import requestPromise = require('request-promise');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import protractor = require("protractor");

var base_url = "http://localhost:3000";
var local_url = "http://localhost:8080";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^O sistema não tem nenhuma mensagem$/, async () => {
        await request.get(base_url + "/chat/1")
        .then((res) => {
            expect(JSON.parse(res).bytes).to.equal('[]');
        });
    });

    When(/^Eu envio uma mensagem com o conteudo "([^\"]*)"$/, async (text) => {
        let body = {
            "json":{
                bytes : JSON.stringify({type: "message", content: text})
            }
        };
        await request.post(base_url + "/chat/1", body).then((res) => {
            expect(res.success).to.equal("message added on chat service");
        });
    });

    Then(/^O sistema tem uma mensagem com o conteudo "([^\"]*)"$/, async (text) => {
        await request.get(base_url + "/chat/1")
        .then((res) => {
            expect(JSON.parse(res).bytes.includes(JSON.stringify({type: "message", content: text}))).to.equal(true);
        });
    });

    Given(/^O sistema não tem mensagens indevidas$/, async () => {
        await request.get(base_url + "/chat/1")
        .then((res) => {
            let messageArray: any = JSON.parse(JSON.parse(res).bytes);

            for(let i = 0; i < messageArray.length; i++){
                expect(Utils.needCensorship(messageArray[i].content)).to.equal(false);
            }
        });
    });

    When(/^Eu enviar uma mensagem que tenha o palavrão "([^\"]*)"$/, async (curse) => {
        let body = {
            "json":{
                bytes : JSON.stringify({type: "message", content: curse})
            }
        };
        await request.post(base_url + "/chat/1", body).then((res) => {
            expect(res.success).to.equal("message added on chat service");
        });
    });

    Then(/^O sistema esconde a palavra "([^\"]*)" como "([^\"]*)" na mensagem$/, async (curse, corrected) => {
        await request.get(base_url + "/chat/1")
        .then((res) => {
            expect(JSON.parse(res).bytes.includes(JSON.stringify({type: "message", content: curse}))).to.equal(false);
            expect(JSON.parse(res).bytes.includes(JSON.stringify({type: "message", content: corrected}))).to.equal(true);
        });
    });

    Then(/^O sistema não salva a palavra "([^\"]*)"$/, async (curse) => {
        await request.get(base_url + "/chat/1")
        .then((res) => {
            expect(JSON.parse(res).bytes.includes(JSON.stringify({type: "message", content: curse}))).to.equal(false);
        });
    });
})