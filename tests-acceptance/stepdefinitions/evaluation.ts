import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the To contract page of the service provider "Flavio"$/, async () => {
        await browser.get("http://localhost:8080/#/tocontract/1");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })
    Then(/^I can see the evaluations list which has an evaluation with "Really good service!" on its content$/, async () => {
        const reviews = await element.all(by.id('reviewtext'))
        await expect(reviews[0].getText()).to.eventually.equal('Sérgio: Really good service!');
    });
})