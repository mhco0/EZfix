Feature: as a customer
        I want to choose between paying online or in person
        And I want to have the option to pay by credit card

    Scenario: Pay before service
        Given I am on the "Payment" page
        And I am sign in as a "Client"
        When I enter my credit card information
        And I confirm my choice
        Then I go to the "Contracts Board" page
        And I see that the "Payment Status" is paid

    Scenario: Pay after service
        Given I am on the "Payment" page
        And I am sign in as a "Client"
        When I choose the "Pay in person" option
        Then I go to the "Contracts Board" page
        And I see that the "Payment Status" is pending