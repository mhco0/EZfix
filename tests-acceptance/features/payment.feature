Feature: as a customer
        I want to choose between paying online or in person
        And I want to have the option to pay by credit card

    Scenario: Pay before service
        Given I am on the "Payment" page with provider id "1"
        Given I can see a form to add my credit card information
        When I enter my cardholder name "Sergio Soares" card number "1111222233334444" expiration month "11" expiration year "2025" cvv "101"
        When I confirm the payment
        Then I go to the "Contracts board view" page
        Then I see that the payment status is "paid"

    Scenario: Pay after service
        Given I am on the "Payment" page with provider id "2"
        Given I can see a button to pay in person
        When I choose the pay in person option
        Then I go to the "Contracts board view" page
        Then I see that the payment status is "pending"

    Scenario: Payment failure, invalid data
        Given I am on the "Payment" page with provider id "3"
        When I enter my cardholder name "Sergio Soares" card number "1111222233334444" expiration month "11" expiration year "2025" cvv "101"
        When I enter the CVV "102" wrong
        When I confirm the payment
        Then a error message is shown

    Scenario: Payment failure, wrong credit card number
        Given I am on the "Payment" page with provider id "3"
        When I enter my cardholder name "Sergio Soares" card number "1111222233334444" expiration month "11" expiration year "2025" cvv "101"
        When I enter the card number "1111222233334449" wrong
        When I confirm the payment
        Then a error message is shown

    Scenario: Pay for a service online after choosing payment in person
        Given I am at the "Contracts board view" page
        Given I see that the payment status is "pending"
        When I choose the "Pay Now" option
        When I enter my cardholder name "Sergio Soares" card number "1111222233334444" expiration month "11" expiration year "2025" cvv "101"
        When I confirm the payment
        Then I go to the "Contracts board view" page
        Then I can't see the payment status is "pending"

    Scenario: Creating a new service
        Given the system has two services registered with id "1" and id "2"
        Given the system has no service with id "3"
        When I register a new service with the service provider id "4", payment status "true" and online "true"
        Then the system has a service with id "3"
