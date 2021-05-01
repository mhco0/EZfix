import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";
var client_id = "1";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am on the "([^\"]*)" page with provider id "(\d*)"$/, async (title, provider_id) => {
        await browser.get(`http://localhost:8080/#/payment/${provider_id}`);
        await expect(element(by.id('payment-view-title')).getText()).to.eventually.equal(title.toString());
    })

    Given(/^I can see a form to add my credit card information$/, async () => {
        await element(by.id('credit-card-form'));
    })

    When(/^I enter my cardholder name "([^\"]*)" card number "(\d*)" expiration month "(\d*)" expiration year "(\d*)" cvv "(\d*)"$/,
        async (cardName, cardNum, expM, expY, cvv) => {
            await element(by.id('input-card-name')).sendKeys(cardName.toString());
            await element(by.id('input-card-number')).sendKeys(cardNum.toString());
            await element(by.id('input-card-expiration-month')).sendKeys(expM.toString());
            await element(by.id('input-card-expiration-year')).sendKeys(expY.toString());
            await element(by.id('input-card-cvv')).sendKeys(cvv.toString());
        })

    When(/^I confirm the payment$/, async () => {
        await element(by.id('confirm-payment-now')).click();
    })

    Then(/^I go to the "([^\"]*)" page$/, async (title) => {
        await expect(element(by.id('contracts-board-title')).getText()).to.eventually.equal(title.toString());
    })

    Then(/^I see that the payment status is "([^\"]*)"$/, async (status) => {
        await element(by.id(`payment-status-${status}`));
    })

    Given(/^I can see a button to pay in person$/, async () => {
        await element(by.id('credit-card-form'));
    })

    When(/^I choose the pay in person option$/, async () => {
        await element(by.id('pay-in-person-button')).click();

        var alert = await browser.switchTo().alert();
        await alert.accept();
    })

    When(/^I enter the CVV "(\d*)" wrong$/, async (cvv) => {
        var cvvInput = await element(by.id('input-card-cvv'));
        await cvvInput.clear().then(async function () {
            await cvvInput.sendKeys(cvv.toString());
        })
    })

    Then(/^a error message is shown$/, async () => {
        var alert = await browser.switchTo().alert();
        await expect(alert.getText()).to.eventually.equal('Your payment failure, please review your credit card information!');
        await alert.dismiss();
    })

    When(/^I enter the card number "(\d*)" wrong$/, async (cardNum) => {
        var cardNumberInput = await element(by.id('input-card-number'));
        await cardNumberInput.clear().then(async function () {
            await cardNumberInput.sendKeys(cardNum.toString());
        })
    })

    Given(/^I am at the "([^\"]*)" page$/, async (title) => {
        await browser.get("http://localhost:8080/#/contracts");
        await expect(element(by.id('contracts-board-title')).getText()).to.eventually.equal(title.toString());
    })

    When(/^I choose the "Pay Now" option$/, async () => {
        await element(by.id('pay-service-now')).click();
    })

    Then(/^I can't see the payment status is "([^\"]*)"$/, async (status) => {
        const paymentsPending = await element.all(by.id(`payment-status-${status}`));

        await expect(paymentsPending.length).to.equal(0);
    })

    Given(/^the system has two services registered with id "(\d*)" and id "(\d*)"$/, async (id1, id2) => {
        await request.get(base_url + "listcontracts/" + client_id)
            .then(body => {
                expect(body.includes(`"id":${id1}`)).to.equal(true);
                expect(body.includes(`"id":${id2}`)).to.equal(true);
            });
    })

    Given(/^the system has no service with id "(\d*)"$/, async (id) => {
        await request.get(base_url + "listcontracts/" + client_id)
            .then(body =>
                expect(body.includes(`"id":${id}`)).to.equal(false)
            );
    })

    When(/^I register a new service with the service provider id "(\d*)", payment status "([^\"]*)" and online "([^\"]*)"$/,
        async (provider_id, payment_status, payment_online) => {
            var service = {
                "json": {
                    "client_id": client_id,
                    "service_provider_id": provider_id,
                    "payment_status": payment_status,
                    "payment_online": payment_online
                }
            }

            await request.post(base_url + "service/" + provider_id, service)
                .then(body =>
                    expect(body.success).to.equal("Successful service create")
                );
        })

    Then(/^the system has a service with id "(\d*)"$/, async (id) => {
        await request.get(base_url + "listcontracts/" + client_id)
            .then(body =>
                expect(body.includes(`"id":${id}`)).to.equal(true)
            );
    });

})