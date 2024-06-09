Feature: Automate Swaglab Web UI Page 

   Scenario: Customer purchases products
   Given standard customer is logged in
   When the customer adds multiple products to the shopping cart
   And proceeds to checkout the purchase
   Then purchase is successful

   Scenario: Customer sorts product items
    Given standard customer is login
    When the customer sorts available products in product view
    Then the products are ordered according to the chosen sort method

    Scenario: User is locked out from the platform 
    Given customer is a locked out customer
    When the customer attempts to login using proper credentials
    Then login fails
    And the customer is presented with error state