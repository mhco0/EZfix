Feature: As a client
        I want to choose a service category and see the correct services providers

Scenario: Clicking the House Cleaning Button
Given I am at the Home page
Given I can see the "House Cleaning" button
When I click on the "House Cleaning" button
Then I can see services providers for "House Cleaning" category

Scenario: Clicking the Eletric Repair Button
Given I am at the Home page
Given I can see the "Eletric Repair" button
When I click on the "Eletric Repair" button
Then I can see services providers for "Eletric Repair" category

Scenario: Clicking the Plumbing Button
Given I am at the Home page
Given I can see the "Plumbing" button
When I click on the "Plumbing" button
Then I can see services providers for "Plumbing" category
