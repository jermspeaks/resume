Feature: Reverb Topic Graph Editor Main Page
  Reverb topic graph editor main page should show the menu of options

    Scenario: Main page should show the menu of options
        Given I am on the main page
        Then The landing page has loaded correctly
        And I should see the menu options
        And I click on the new topics page
        And I have been redirected to new topics
        And I click the main logo
        And I should see the menu options
