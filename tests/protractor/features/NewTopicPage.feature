Feature: Reverb Topic Graph Editor New Topic Page
  Reverb topic graph editor new topic page

    Scenario: Render New Topic Form Page
        Given I am on the new topic page
        Then I see an error message beneath the input
        And The blank topic error should read 'A Topic Name is Required'
        And I can type into the topic name input
        And The error message goes away
        And A submit button appears

    Scenario: Switch between different forms on the New Topic Form Page
        Given I am on the new topic page
        Then The attributes tab should be active
        And I click on the forms tab
        And The forms tab should be active
        And I click on the search tab
        And The search tab should be active

    Scenario: Filling out attributes form
        Given I am on the new topic page
        Then I can type into the topic name input
        And I can type into the 'Original Name' input with an alternative name
        And I can toggle the topic as block listed
        And I can type into 'Categories' input
        And A new category tag is created
        And I can create another new category tag
        And The number of category tags is two
        And I can type into the 'Named Entity Types' input and select from autocomplete
        And A new name entity type tag is created

    Scenario: Filling out forms form
        Given I am on the new topic page
        Then I can type into the topic name input
        And I click on the forms tab
        And The default form is shown
        And I click to reveal the form attributes of the default forms
        And I can change the value of the link probability
        And I can change the value of the sense probability
        And I can add a new form
        And I can change the name of the new form
        And The count of the forms should be 2
        And I can add a new form
        And The count of the forms should be 3
        And I can remove a form
        And The count of the forms should be 2

    Scenario: Filling out search form
        Given I am on the new topic page
        Then I can type into the topic name input
        And I click on the search tab
        And I can add a related topic
        And The count of the topics should be 1
        And I can add a related topic
        And The count of the topics should be 2
        And I can remove a related topic
        And The count of the topics should be 1
        And I can type 'Test' into the main search box to get a list of related topics
        And I can see the related topics of the first search result
        And I can select the first topic related to the first form result
        And The topic should appear in the related topics list
