import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

async function get_provider_element(name: any){
    const providers_boards = await element.all(by.id('contract-border'));

    var provider = [];
    for(var i = 0; i < providers_boards.length; i++){
        try{
            const provider_name = await providers_boards[i].element(by.id("provider-name"));
            await expect(provider_name.getText()).to.eventually.equal(name);
            provider.push(providers_boards[i]);
        }
        catch(e){}
    }

    if(provider.length == 0){
        throw "Didn't find a provider with name "+name;
    }

    return provider;
}
async function get_provider_add_review_button_element(name: any){
    const provider_elements = await get_provider_element(name)

    for(var i=0; i<provider_elements.length; i++){
        try{
            const button_element = await provider_elements[i].all(by.id('addreview-button'));
            if(button_element.length > 0) return button_element[0];
        }
        catch(e){}
    }

    throw "There is no add review button for the provider "+name
}

async function get_evaluated_service() {
    var service_id = -1
    await request.get(base_url + "listcontracts/1").then(response => {
        JSON.parse(response).forEach(contract => {
            if(contract.has_evaluation == true){
                service_id = contract.id;
            }
        });
    })

    if(service_id == -1) throw "There's no no evaluated service";

    return service_id;
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the Contracts Board page$/, async () => {
        await browser.get("http://localhost:8080/#/contracts");
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })

    Given(/^I can see a service of the service provider "([^\"]*)"$/, async (name) => {
        await get_provider_element(name)
    })

    Given(/^I can see the button Add a review of the service provider "([^\"]*)"$/, async (name) => {
        await get_provider_add_review_button_element(name)
    })

    When(/^I click on the button Add a review of the service provider "([^\"]*)"$/, async (name) => {
        const button = await get_provider_add_review_button_element(name);

        button.click();
    })

    Then(/^I can see the evaluation dialog$/, async () => {
        await element(by.id('evaluationform-dialog'));
    })

    Given(/^I am at the evaluation dialog of the service provider "([^\"]*)"$/, async (name) => {
        const provider_name = await element(by.id("dialog-provider-name"));
        await expect(provider_name.getText()).to.eventually.contain(name)
    })

    When(/^I register the evaluation with Attendance "([^\"]*)", Punctuality "([^\"]*)", Service Quality "([^\"]*)", comment "([^\"]*)" and Evaluate EZfiz "([^\"]*)"$/, async (
        attendance,
        punctuality,
        service_quality,
        comment,
        ezfix_evaluation
    ) => {
        await element(by.id("attendance")).element(by.css('[aria-label="Rating '+attendance+' of 5"]')).click();
        await element(by.id("punctuality")).element(by.css('[aria-label="Rating '+punctuality+' of 5"]')).click();
        await element(by.id("service-quality")).element(by.css('[aria-label="Rating '+service_quality+' of 5"]')).click();
        await element(by.id("ezfix-evaluation")).element(by.css('[aria-label="Rating '+ezfix_evaluation+' of 5"]')).click();

        await element(by.id('coment-area')).sendKeys(String(comment));
    })

    When(/^I click on the Save button$/, async () => {
        await element(by.id('savecoment-button')).click();

        var alert = await browser.switchTo().alert();
        await alert.dismiss();
    })

    Then(/^The evaluation dialog of the service provider closes$/, async () => {
        const dialog = await element.all(by.id('evaluationform-dialog'));

        await expect(dialog.length).to.equal(0);
    })

    Given(/^I am at the To contract page of the service provider "([^\"]*)"$/, async (name) => {
        var id = -1;

        await request.get(base_url + "listcontracts/1").then(response => {
            JSON.parse(response).forEach(contract => {
                if(contract.provider_name == String(name)){
                    id = contract.provider_id;
                }
            });
        })
        if(id == -1) throw "Didn't find a provider with name "+name;

        await browser.get("http://localhost:8080/#/tocontract/"+id.toString());
        await expect(browser.getTitle()).to.eventually.equal('ezfix-gui');
    })

    Then(/^I can see the evaluations list which has an evaluation with "([^\"]*)" on its content$/, async (comment) => {
        const reviews = await element.all(by.id('reviewtext'))

        for(var i = 0; i < reviews.length; i++){
            try{
                await expect(reviews[i].getText()).to.eventually.equal("Sérgio: " + String(comment));

                return;
            }
            catch(e){}
        }

        throw "Didn't find the coment "+comment
    });

    When(/^I try to evaluate a service already evaluated$/, async () => {
        await get_evaluated_service();
    });

    Then(/^The system doesn't store the evaluation$/, async () => {
        const service_id = get_evaluated_service();

        const body:any = {
            "evaluator_id": 1,
            "attendance_rating": 5,
            "punctuality_rating": 5,
            "service_quality_rating": 5,
            "ezfix_rating": 5,
            "coment": "Nice service!"
        }

        await request.post(base_url + "evaluate/"+service_id.toString(), body).catch(response => {
            expect(response.error).to.equal('{"failure":"Error in evaluation"}');
        })
    })
})