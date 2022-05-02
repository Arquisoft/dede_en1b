Feature: Adding items to the cart

Scenario: Adding one item
    Given A user
    When They add an item to the cart and navigate to the cart
    Then They can see the item

Scenario: Adding an item from product details view
    Given A user
    When They add an item to the cart from the details view of the product and navigate to the cart
    Then They can see the item