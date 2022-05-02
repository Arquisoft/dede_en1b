Feature: Adding/Changing DedEx Address

Scenario: Adding an address
    Given A loged in user
    When They change their address in their profile
    Then It appears on the shipping page