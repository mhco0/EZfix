import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by} from 'protractor';
import requestPromise = require('request-promise');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import protractor = require("protractor");

var base_url = "http://localhost:3000/";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na página "Chat"$/, async () => {
        await browser.get("http://localhost:8080/#/chat/1");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    });

    Given(/^Eu não consigo ver a mensagem "Teste"$/, async () => {
        let messageList: any = await element.all(by.name('message-name'));

        for(let i = 0; i < messageList.length; i++){
            await expect(messageList[i].getText()).not.equal("Teste");
        }
    });

    When(/^Eu interajo com a interface envio de mensagem, envio a mensagem "Teste"$/, async () => {
        await (<any> element(by.id('chat-input-text-id')).sendKeys("Teste")).sendKeys(protractor.Key.ENTER);
    });

    Then(/^Eu vejo a mensagem "Teste" na página do "Chat"$/, async () => {
        await request.get(base_url + "chat/1").catch(async () => {
            let messageList: any = await element.all(by.name('message-name'));
            let haveCorrectText: boolean = false;

            for(let i = 0; i < messageList.length; i++){
                try{
                    await expect(messageList[i].getText()).to.equal("Teste");

                    haveCorrectText = true;
                    break;
                }catch(error){

                };
            }

            if (!haveCorrectText){
                throw new Error("Can't find message with text : " + "Teste");
            }
        });
    });
})