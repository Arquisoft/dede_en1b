Feature: Registering or logging in a new user

Scenario: The user is not registered in the site
    Given An unregistered user
    When They press the profile button and log in with their preferred SOLID provider
    Then Their name should be shown

Scenario: The user is registered in the site
    Given A registered user
    When They press the profile button and log in with their preferred SOLID provider
    Then Their name and orders, if any, should be shown