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

    Given(/^Eu estou na página Chat$/, async () => {
        await browser.get(local_url  + "/#/chat/1");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    });

    When(/^Eu interajo com a interface envio de mensagem, envio a mensagem ""$/, async () => {
        await (<any> element.all(by.id('chat-input-text-id')).sendKeys("")).sendKeys(protractor.Key.ENTER);
    });

    Then(/^A mensagem "" não é salva na página do Chat$/, async () => {
        
        const messageLits = await element.all(by.css('[name="message-name"]'));

        for(let i = 0; i < messageLits.length; i++){
            await expect(messageLits[i].getAttribute('text')).to.not.eventually.equal("");
        }
    });
})