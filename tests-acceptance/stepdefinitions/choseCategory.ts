import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the Home page$/, async () => {
        await browser.get("http://localhost:8080/#");
        await browser.refresh();
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })

    Given(/^I can see the "([^\"]*)" button$/, async (category) => {
        await element(by.id(String(category) + " Button"));
    })


    When(/^I click on the "([^\"]*)" button$/, async (category) => {
        var button = await element(by.id(`${category} Button`));
        await button.click()

    })

    Then(/^I can see services providers for "([^\"]*)" category$/, async (category) => {
        const providersArr = await element.all(by.id("category"))
        console.log(providersArr.length)
        for (let index = 0; index < providersArr.length; index++) {
            await expect(providersArr[index].getText()).to.eventually.equal(category.toString())
        }

    })

})