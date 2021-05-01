import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the Contracts Board page$/, async () => {
        await browser.get("http://localhost:8080/#/contracts");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })

    Given(/^I can see a concluded service of the service provider with id "1"$/, async () => {
        const providers_names = await element.all(by.id('provider-name'));
        await expect(providers_names[0].getText()).to.eventually.equal('Flávio Playboy');
    })

    Given(/^I can see the button Add a review of the service provider with id "1"$/, async () => {
        await element(by.id('addreview-button'));
    })

    When(/^I click on the button Add a review of the service provider with id "1"$/, async () => {
        await element(by.id('addreview-button')).click();
    })

    Then(/^I can see the evaluation dialog$/, async () => {
        await element(by.id('evaluationform-dialog'));
    })

    Given(/^I am at the evaluation dialog of the service provider with id "1"$/, async () => {
        await element(by.id('evaluationform-dialog'));
    })

    When(/^I register the evaluation with Attendance "5", Punctuality "5", Service Quality "5", comment "Realy good service!" and Evaluate EZfiz "5"$/, async () => {
        const ratings = await element.all(by.css('[aria-label="Rating 5 of 5"]'));

        for(var i = 0; i < ratings.length; i++){
            ratings[i].click()
        }

        await element(by.id('coment-area')).sendKeys("Really good service!");
    })

    When(/^I click on the Save button$/, async () => {
        await element(by.id('savecoment-button')).click();

        var alert = await browser.switchTo().alert();
        await alert.dismiss();
    })

    Then(/^The evaluation dialog of the service provider with id "1" closes$/, async () => {
        const dialog = await element.all(by.id('evaluationform-dialog'));

        await expect(dialog.length).to.equal(0);
    })

    Given(/^I am at the To contract page of the service provider with id "1"$/, async () => {
        await browser.get("http://localhost:8080/#/tocontract/1");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })
    Then(/^I can see the evaluations list which has an evaluation with "Really good service!" on its content$/, async () => {
        const reviews = await element.all(by.id('reviewtext'))
        await expect(reviews[0].getText()).to.eventually.equal('Sérgio: Really good service!');
    });

    When(/^I try to evaluate the same service with Attendance "5", Punctuality "5", Service Quality "5", comment "Nice service!" and Evaluate EZfiz "5"$/, async () => {
        const body:any = {
            "evaluator_id": 1,
            "attendance_rating": 5,
            "punctuality_rating": 5,
            "service_quality_rating": 5,
            "ezfix_rating": 5,
            "coment": "Nice service!"
        }

        await request.post(base_url + "evaluate/1", body).catch(response => {
            expect(response.error).to.equal('{"failure":"Error in evaluation"}');
        })
    })

    Then(/^The system doesn't store the evaluation$/, async () => {
        await request.get(base_url + "listcoments/1").then(response => {
            expect(JSON.parse(response).coments[0].coment).not.equal("Nice service!")
        })
    })
})