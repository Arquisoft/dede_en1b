Feature: Adding items to the cart

Scenario: Adding only one item
    Given A user
    When They add an item to the cart and navigate to the cart
    Then They can see the item

# Scenario: Adding Serveral items
#     Given A user
#     When They add 2 items to the cart and navigate to the cart
#     Then They can see the items