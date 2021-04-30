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

    Given(/^I can see a concluded service of the service provider "Flavio"$/, async () => {
        const providers_names = await element.all(by.id('provider-name'));
        await expect(providers_names[0].getText()).to.eventually.equal('Flávio Playboy');
    })

    Given(/^I can see the button Add a review of the service provider "Flavio"$/, async () => {
        await element(by.id('addreview-button'));
    })

    When(/^I click on the button Add a review of the service provider "Flavio"$/, async () => {
        await element(by.id('addreview-button')).click();
    })

    Then(/^I can see the evaluation dialog$/, async () => {
        await element(by.id('evaluationform-dialog'));
    })

    Given(/^I am at the evaluation dialog of the service provider "Flavio"$/, async () => {
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

    Then(/^The evaluation dialog of Flavio closes$/, async () => {
        const dialog = await element.all(by.id('evaluationform-dialog'));

        await expect(dialog.length).to.equal(0);
    })

    Then(/^I can not see the button Add a review of the service provider "Flavio"$/, async () => {
        await browser.get("http://localhost:8080/#/contracts");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');

        const add_review_buttons = await element.all(by.id('addreview-button'));

        await expect(add_review_buttons.length).to.equal(0);
    })

    Given(/^I am at the To contract page of the service provider "Flavio"$/, async () => {
        await browser.get("http://localhost:8080/#/tocontract/1");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })
    Then(/^I can see the evaluations list which has an evaluation with "Really good service!" on its content$/, async () => {
        const reviews = await element.all(by.id('reviewtext'))
        await expect(reviews[0].getText()).to.eventually.equal('Sérgio: Really good service!');
    });
})