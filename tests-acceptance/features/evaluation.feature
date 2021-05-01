Feature: As a client
        I want to evaluate a service provider after a service
        And I want to see the previows and mine evalutations of him

Scenario: Openning the evaluating dialog of a service provider
        Given I am at the Contracts Board page
        Given I can see a service of the service provider "Flávio Cap"
        Given I can see the button Add a review of the service provider "Flávio Cap"
        When I click on the button Add a review of the service provider "Flávio Cap"
        Then I can see the evaluation dialog

Scenario: Evaluating the service provider
        Given I am at the evaluation dialog of the service provider "Flávio Cap"
        When I register the evaluation with Attendance "5", Punctuality "2", Service Quality "5", comment "Really good service!" and Evaluate EZfiz "5"
        When I click on the Save button
        Then The evaluation dialog of the service provider closes

Scenario: List the previows evaluations of a service provider
        Given I am at the To contract page of the service provider "Flávio Cap"
        Then I can see the evaluations list which has an evaluation with "Really good service!" on its content

Scenario: Trying to evaluating a service already evaluated
        When I try to evaluate a service already evaluated
        Then The system doesn't store the evaluation