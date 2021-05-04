import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the Home page$/, async () => {
        await browser.get("http://localhost:8080/#");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })

    Given(/^I can see the "([^\"]*)" button$/, async (category) => {
        await element(by.id(`${category} Button`));
    })


    When(/^I click on the "House Cleaning" button$/, async () => {
        const button = await element(by.id("House Cleaning Button"));
        await button.click()
    })

    When(/^I click on the "Eletric Repair" button$/, async () => {
        const button = await element(by.id("Eletric Repair Button"));
        await button.click()
    })

    Then(/^I can see services providers for "([^\"]*)" category$/, async (category) => {
        // const providersArr = await element.all(by.id("category"))
        // for (let index = 0; index < providersArr.length; index++) {
        //     var categoryText = providersArr[index].getText()
        //     await expect(categoryText).to.eventually.equal(category.toString());

        // }
    })

})