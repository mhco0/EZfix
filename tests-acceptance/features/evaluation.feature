Feature: As a client
        I want to evaluate a service provider after a service
        And I want to see the previows and mine evalutations of him

Scenario: Openning the evaluating dialog of a service provider
Given I am at the Contracts Board page
Given I can see a concluded service of the service provider "Flavio"
Given I can see the button Add a review of the service provider "Flavio"
When I click on the button Add a review of the service provider "Flavio"
Then I can see the evaluation dialog

Scenario: Evaluating the service provider
Given I am at the evaluation dialog of the service provider "Flavio"
When I register the evaluation with Attendance "5", Punctuality "5", Service Quality "5", comment "Realy good service!" and Evaluate EZfiz "5"
When I click on the Save button
Then The evaluation dialog of Flavio closes

Scenario: List the previows evaluations of a service provider
Given I am at the To contract page of the service provider "Flavio"
Then I can see the evaluations list which has an evaluation with "Really good service!" on its content

Scenario: Trying to evaluating a service provider already evaluated
When I try to evaluate the same service with Attendance "5", Punctuality "5", Service Quality "5", comment "Nice service!" and Evaluate EZfiz "5"
Then The system doesn't store the evaluation