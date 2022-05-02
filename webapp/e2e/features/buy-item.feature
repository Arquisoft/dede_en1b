Feature: Buying products

Scenario: Buying a product
  Given A user with an item in his cart
  When They buy it
  Then The order appears in their profile