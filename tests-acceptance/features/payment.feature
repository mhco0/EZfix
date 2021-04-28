Feature: as a customer
        I want to choose between paying online or in person
        And I want to have the option to pay by credit card

    Scenario: Pay before service
        Given I am on the "Payment" page
        And I am sign in as a "Client"
        When I enter my "Credit Card" information
        And I confirm my choice
        Then I go to the "Contracts Board" page
        And I see that the "Payment Status" is paid

    Scenario: Pay after service
        Given I am on the "Payment" page
        And I am sign in as a "Client"
        When I choose the "Pay in person" option
        Then I go to the "Contracts Board" page
        And I see that the "Payment Status" is pending

    Scenario: Payment failure, invalid data
        Given I am on the "Payment" page
        And I am sign in as a "Client"
        When I enter my "Credit Card" information
        And I enter the CVV "529" wrong
        Then a error message is shown

    Scenario: Payment failure, wrong credit card number
        Given I am on the "Payment" page
        And I am sign in as a "Client"
        When I enter my "Credit Card" information
        And I enter the card number "1111222233334449" wrong
        Then a error message is shown