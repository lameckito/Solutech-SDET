Feature: Booking System

  Scenario: Book a tour from home page as a guest
    Given I am on the homepage
    When I select a tour and book it
    Then I should see the ticket page

  Scenario: Admin creates a new tour
    Given I am logged in as admin
    When I navigate to "Create Tour"
    And I fill in all required tour details
    Then the tour should be created successfully

  Scenario: Admin views all bookings
    Given I am logged in as admin
    When I go to "All Bookings"
    Then I should see a list of bookings

  Scenario: Admin views all tickets
    Given I am logged in as admin
    When I go to "All Tickets"
    Then I should see all generated tickets
