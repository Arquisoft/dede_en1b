Feature: Visualizing products

Scenario: Main Products view
  Given An user
  When They enter the application
  Then Several Prodcut cards must be shown

Scenario: Product detail view
  Given An user
  When They enter the application and click on a product card
  Then The details view of the selected product must be shown