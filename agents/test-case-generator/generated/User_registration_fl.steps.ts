import { Given, When, Then } from '@cucumber/cucumber';

export class User_registration_flSteps {
    // @ts-ignore
    @Given('User opens the homepage')
    public async userOpensTheHomepage(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User clicks on the "Sign Up" button')
    public async userClicksOnTheSignUpButton(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters a unique email address in the email field')
    public async userEntersAUniqueEmailAddressInTheEmailField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters a strong password in the password field')
    public async userEntersAStrongPasswordInThePasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User confirms the password by typing the same strong password in the confirm password field')
    public async userConfirmsThePasswordByTypingTheSameStrongPasswordInTheConfirmPasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User clicks the "Sign Up" button')
    public async userClicksTheSignUpButton(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An account creation success message is displayed')
    public async anAccountCreationSuccessMessageIsDisplayed(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('The user is redirected to the homepage')
    public async theUserIsRedirectedToTheHomepage(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters an existing email address in the email field')
    public async userEntersAnExistingEmailAddressInTheEmailField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the email is already registered')
    public async anErrorMessageIsDisplayedInformingTheUserThatTheEmailIsAlreadyRegistered(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User leaves the email field blank')
    public async userLeavesTheEmailFieldBlank(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the email field is required')
    public async anErrorMessageIsDisplayedInformingTheUserThatTheEmailFieldIsRequired(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters a short password in the password field (less than the minimum characters)')
    public async userEntersAShortPasswordInThePasswordFieldLessThanTheMinimumCharacters(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User confirms the password by typing the same short password in the confirm password field')
    public async userConfirmsThePasswordByTypingTheSameShortPasswordInTheConfirmPasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the password must meet the minimum character requirement')
    public async anErrorMessageIsDisplayedInformingTheUserThatThePasswordMustMeetTheMinimumCharacterRequirement(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters a different strong password in the confirm password field')
    public async userEntersADifferentStrongPasswordInTheConfirmPasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the passwords do not match')
    public async anErrorMessageIsDisplayedInformingTheUserThatThePasswordsDoNotMatch(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters a password containing only numeric characters in the password field')
    public async userEntersAPasswordContainingOnlyNumericCharactersInThePasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User confirms the password by typing the same password with numeric characters in the confirm password field')
    public async userConfirmsThePasswordByTypingTheSamePasswordWithNumericCharactersInTheConfirmPasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the password must contain a mix of letters, numbers, and special characters')
    public async anErrorMessageIsDisplayedInformingTheUserThatThePasswordMustContainAMixOfLettersNumbersAndSpecialCharacters(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('An inactive account is created by manually setting the status to inactive in the database')
    public async anInactiveAccountIsCreatedByManuallySettingTheStatusToInactiveInTheDatabase(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User clicks on the "Sign In" button')
    public async userClicksOnTheSignInButton(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters the email associated with the created inactive account in the email field')
    public async userEntersTheEmailAssociatedWithTheCreatedInactiveAccountInTheEmailField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters the password for the inactive account in the password field')
    public async userEntersThePasswordForTheInactiveAccountInThePasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User clicks the "Sign In" button')
    public async userClicksTheSignInButton(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the account is inactive')
    public async anErrorMessageIsDisplayedInformingTheUserThatTheAccountIsInactive(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('An expired account is created by manually setting the expiration date of the account to the past in the database')
    public async anExpiredAccountIsCreatedByManuallySettingTheExpirationDateOfTheAccountToThePastInTheDatabase(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters the email associated with the expired account in the email field')
    public async userEntersTheEmailAssociatedWithTheExpiredAccountInTheEmailField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @When('User enters the password for the expired account in the password field')
    public async userEntersThePasswordForTheExpiredAccountInThePasswordField(): Promise<void> {
        // TODO: implement step
    }

    // @ts-ignore
    @Then('An error message is displayed informing the user that the account has expired')
    public async anErrorMessageIsDisplayedInformingTheUserThatTheAccountHasExpired(): Promise<void> {
        // TODO: implement step
    }
}