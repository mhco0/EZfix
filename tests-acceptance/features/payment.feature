Feature: as a customer
        I want to choose between paying online or in person
        And I want to have the option to pay by credit card

    Scenario: Pay before service
        Given I am on the "Payment" page
        Given I can see a form to add my credit card information
        When I enter my "Credit Card" informations
        When I confirm the payment
        Then I go to the "Contracts Board" page
        Then I see that the "Payment Status" is paid

    Scenario: Pay after service
        Given I am on the "Payment" page
        Given I can see a button to pay in person
        When I choose the "Pay in person" option
        Then I go to the "Contracts Board" page
        Then I see that the "Payment Status" is pending

    Scenario: Payment failure, invalid data
        Given I am on the "Payment" page
        When I enter my "Credit Card" informations
        When I enter the CVV "102" wrong
        When I confirm the payment
        Then a error message is shown

    Scenario: Payment failure, wrong credit card number
        Given I am on the "Payment" page
        When I enter my "Credit Card" informations
        When I enter the card number "1111222233334449" wrong
        When I confirm the payment
        Then a error message is shown

    Scenario: Pay for a service online after choosing payment in person
        Given I am at the Contracts Board page
        Given I see that the "Payment Status" is pending
        When I choose the "Pay Now" option
        When I enter my "Credit Card" informations
        When I confirm the payment
        Then I go to the "Contracts Board" page
        Then I can't see the "Payment Status" is pending