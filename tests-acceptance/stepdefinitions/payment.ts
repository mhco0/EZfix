import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";
var client_id = "1";

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am on the "Payment" page$/, async () => {
        await browser.get("http://localhost:8080/#/payment/1");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })

    Given(/^I can see a form to add my credit card information$/, async () => {
        await element(by.id('credit-card-form'));
    })

    When(/^I enter my "Credit Card" informations$/, async () => {
        await element(by.id('input-card-name')).sendKeys("Sergio Soares");
        await element(by.id('input-card-number')).sendKeys("1111222233334444");
        await element(by.id('input-card-expiration-month')).sendKeys("11");
        await element(by.id('input-card-expiration-year')).sendKeys("2025");
        await element(by.id('input-card-cvv')).sendKeys("101");
    })

    When(/^I confirm the payment$/, async () => {
        await element(by.id('confirm-payment-now')).click();
    })

    Then(/^I go to the "Contracts Board" page$/, async () => {
        await expect(element(by.id('contracts-board-title')).getText()).to.eventually.equal('Contracts board view:');
    })

    Then(/^I see that the "Payment Status" is paid$/, async () => {
        await element(by.id('payment-status-paid'));
    })


    Given(/^I can see a button to pay in person$/, async () => {
        await element(by.id('credit-card-form'));
    })

    When(/^I choose the "Pay in person" option$/, async () => {
        await element(by.id('pay-in-person-button')).click();

        var alert = await browser.switchTo().alert();
        await alert.accept();
    })

    Then(/^I see that the "Payment Status" is pending$/, async () => {
        await element(by.id('payment-status-pending'));
    })

    When(/^I enter the CVV "102" wrong$/, async () => {
        var cvvInput = await element(by.id('input-card-cvv'));
        await cvvInput.clear().then(async function () {
            await cvvInput.sendKeys('102');
        })
    })

    Then(/^a error message is shown$/, async () => {
        var alert = await browser.switchTo().alert();
        await expect(alert.getText()).to.eventually.equal('Your payment failure, please review your credit card information!');
        await alert.dismiss();
    })

    When(/^I enter the card number "1111222233334449" wrong$/, async () => {
        var cardNumberInput = await element(by.id('input-card-number'));
        await cardNumberInput.clear().then(async function () {
            await cardNumberInput.sendKeys('1111222233334449');
        })
    })

    When(/^I choose the "Pay Now" option$/, async () => {
        await element(by.id('pay-service-now')).click();
    })

    Then(/^I can't see the "Payment Status" is pending$/, async () => {
        const paymentsPending = await element.all(by.id('payment-status-pending'));

        await expect(paymentsPending.length).to.equal(0);
    })

    Given(/^the system has two services registered with id "1" and id "2"$/, async () => {
        await request.get(base_url + "listcontracts/" + client_id)
            .then(body => {
                expect(body.includes(`"id":1`)).to.equal(true);
                expect(body.includes(`"id":2`)).to.equal(true);
            });
    })

    Given(/^the system has no service with id "3"$/, async () => {
        await request.get(base_url + "listcontracts/" + client_id)
            .then(body =>
                expect(body.includes(`"id":3`)).to.equal(false)
            );
    })

    When(/^I register a new service with the service provider id "2", payment status and online "true"$/, async () => {
        var service = {
            "json": {
                "client_id": client_id,
                "service_provider_id": 2,
                "payment_status": true,
                "payment_online": true
            }
        }

        await request.post(base_url + "service/" + "2", service)
            .then(body =>
                expect(body.success).to.equal("Successful service create")
            );
    })

    Then(/^the system has a service with id "3"$/, async () => {
        await request.get(base_url + "listcontracts/" + client_id)
            .then(body =>
                expect(body.includes(`"id":3`)).to.equal(true)
            );
    });

})