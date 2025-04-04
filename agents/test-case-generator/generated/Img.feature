Feature: Img

  Scenario: Successful Login
    Given User opens the homepage.
    When User types a valid email address into the 'Email' field.
    When User types a valid password into the 'Password' field.
    When User clicks the 'LOG IN' button.
    Then User is redirected to the user's account dashboard.

  Scenario: Login with Google
    Given User opens the homepage.
    When User clicks the 'LOG IN WITH GOOGLE' button.
    When User logs in using their Google credentials.
    Then User is redirected to the user's account dashboard.

  Scenario: Incorrect Email
    Given User opens the homepage.
    When User types an invalid email address into the 'Email' field.
    When User types a valid password into the 'Password' field.
    When User clicks the 'LOG IN' button.
    Then An error message is displayed, indicating an incorrect email address.

  Scenario: Incorrect Password
    Given User opens the homepage.
    When User types a valid email address into the 'Email' field.
    When User types an incorrect password into the 'Password' field.
    When User clicks the 'LOG IN' button.
    Then An error message is displayed, indicating an incorrect password.

  Scenario: Empty Email Field
    Given User opens the homepage.
    When User leaves the 'Email' field empty.
    When User types a valid password into the 'Password' field.
    When User clicks the 'LOG IN' button.
    Then An error message is displayed, indicating that the email field is required.

  Scenario: Empty Password Field
    Given User opens the homepage.
    When User types a valid email address into the 'Email' field.
    When User leaves the 'Password' field empty.
    When User clicks the 'LOG IN' button.
    Then An error message is displayed, indicating that the password field is required.

  Scenario: Forgot Password Navigation
    Given User opens the homepage.
    When User clicks the 'Forgot password?' link.
    Then User is redirected to the password recovery page.

  Scenario: Sign Up Navigation
    Given User opens the homepage.
    When User clicks the 'Sign up' link.
    Then User is redirected to the registration page.

  Scenario: Empty Email and Password Fields
    Given User opens the homepage.
    When User leaves the 'Email' field empty.
    When User leaves the 'Password' field empty.
    When User clicks the 'LOG IN' button.
    Then Error messages are displayed for both empty fields.

  Scenario: Special Characters in Email
    Given User opens the homepage.
    When User types an email address with special characters (!@#$%^&*()_+=-`~[]\{}|;':",./<>?) into the 'Email' field.
    When User types a valid password into the 'Password' field.
    When User clicks the 'LOG IN' button.
    Then System handles the input appropriately (either accepts or rejects with an error message).