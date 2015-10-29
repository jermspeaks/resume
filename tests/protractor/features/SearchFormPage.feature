Feature: Reverb Topic Graph Editor Search Form Page
  Reverb topic graph editor search form page

    Scenario: Render Search Form Page
        Given I am on the search form page
        Then I see the label for the input reads 'Search For Form Name'

    Scenario: Use autocomplete to view a form
        Given I am on the search form page
        Then I can search 'Top' and select the first item on the autocomplete list
        And I can see the name of the form
        And There are a list of topic results

    Scenario: Search by term to view form list
        Given I am on the search form page
        Then I can search 'Top' and get a list of resulting forms
        And I can see a list of resulting forms
        And I can select the first form
        And I can see the name of the form

    Scenario: Edit a form
        Given I am on the view form page for 'Halo: The Graphic Novel'
        Then I can go to its edit form page
        And I can see its associated topics
        And I can add a related topic field
        And That field should be empty
