Feature: Reverb Topic Graph Editor Search Topic Page
  Reverb topic graph editor search topic page

    Scenario: Render Search Topic Form Page
        Given I am on the search topic page
        Then I see the label for the input reads 'Search for a topic'

    Scenario: Search Topic by autocomplete
        Given I am on the search topic page
        Then I can type into the search topic input field and select the first entry
        And I can view the attributes page

    Scenario: Search Topic by search list
        Given I am on the search topic page
        Then I can type into the search topic input field and press enter
        And I should see a search results list table
        And There are search results listed

    Scenario: View topic attributes, topics, and forms
        Given I am viewing the topic 'Porteus Maze Test'
        Then I can view the attributes page
        And The navigation for attributes should be active
        And The topic is displayed in the header of the attributes page
        And I can find a button to edit the topic
        And I can find a button to delete the topic
        And I can find a button to go to the source
        And I can change the view topic tab to related topics
        And The navigation for related topics should be active
        And I can change the view topic tab to forms
        And The navigation for forms should be active

    Scenario: Edit topic from view topic page
        Given I am viewing the topic 'We Go Home'
        Then I can switch to the edit topic page
        And The edit topic page topic name is 'We Go Home'
        And The original name is filled out
        And I can switch to editing forms
        And The default form is the same, 'We Go Home'
        And I can switch to editing related topics
        And There should a list of related topics
