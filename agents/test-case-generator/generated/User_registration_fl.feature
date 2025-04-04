Feature: User_registration_fl

  Scenario: Verify user registration with valid details
    Given User opens the homepage
    When User clicks on the "Sign Up" button
    When User enters a unique email address in the email field
    When User enters a strong password in the password field
    When User confirms the password by typing the same strong password in the confirm password field
    When User clicks the "Sign Up" button
    Then An account creation success message is displayed
    Then The user is redirected to the homepage

  Scenario: Verify user registration with an existing email
    Given User opens the homepage
    When User clicks on the "Sign Up" button
    When User enters an existing email address in the email field
    When User enters a strong password in the password field
    When User confirms the password by typing the same strong password in the confirm password field
    When User clicks the "Sign Up" button
    Then An error message is displayed informing the user that the email is already registered

  Scenario: Verify user registration with missing email
    Given User opens the homepage
    When User clicks on the "Sign Up" button
    When User leaves the email field blank
    When User enters a strong password in the password field
    When User confirms the password by typing the same strong password in the confirm password field
    When User clicks the "Sign Up" button
    Then An error message is displayed informing the user that the email field is required

  Scenario: Verify user registration with short password
    Given User opens the homepage
    When User clicks on the "Sign Up" button
    When User enters a unique email address in the email field
    When User enters a short password in the password field (less than the minimum characters)
    When User confirms the password by typing the same short password in the confirm password field
    When User clicks the "Sign Up" button
    Then An error message is displayed informing the user that the password must meet the minimum character requirement

  Scenario: Verify user registration with different passwords
    Given User opens the homepage
    When User clicks on the "Sign Up" button
    When User enters a unique email address in the email field
    When User enters a strong password in the password field
    When User enters a different strong password in the confirm password field
    When User clicks the "Sign Up" button
    Then An error message is displayed informing the user that the passwords do not match

  Scenario: Verify user registration with incorrect password format
    Given User opens the homepage
    When User clicks on the "Sign Up" button
    When User enters a unique email address in the email field
    When User enters a password containing only numeric characters in the password field
    When User confirms the password by typing the same password with numeric characters in the confirm password field
    When User clicks the "Sign Up" button
    Then An error message is displayed informing the user that the password must contain a mix of letters, numbers, and special characters

  Scenario: Verify user registration with inactive account
    Given User opens the homepage
    When An inactive account is created by manually setting the status to inactive in the database
    When User clicks on the "Sign In" button
    When User enters the email associated with the created inactive account in the email field
    When User enters the password for the inactive account in the password field
    When User clicks the "Sign In" button
    Then An error message is displayed informing the user that the account is inactive

  Scenario: Verify user registration with expired account
    Given User opens the homepage
    When An expired account is created by manually setting the expiration date of the account to the past in the database
    When User clicks on the "Sign In" button
    When User enters the email associated with the expired account in the email field
    When User enters the password for the expired account in the password field
    When User clicks the "Sign In" button
    Then An error message is displayed informing the user that the account has expired