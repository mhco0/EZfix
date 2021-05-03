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


})