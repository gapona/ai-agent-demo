Feature: Rec

  Scenario: Accessing Match Information via Homepage Navigation
    Given User opens the homepage: `fcbayern.com/en`
    When User hovers over the "Matches" tab in the navigation bar.
    When User clicks on the "Matches" tab.
    When User observes the displayed match schedule and details.
    Then A page displaying the team's match schedule, dates, times, opponents, and potentially other relevant information is shown.

  Scenario: Navigating to the Online Store from Homepage
    Given User opens the homepage: `fcbayern.com/en`
    When User scrolls to the top of the page.
    When User clicks on the "Online Store" button in the top right corner.
    Then The official FC Bayern Munich online store opens in a new tab or the same tab, depending on the website's configuration.

  Scenario: Checking Language Options
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks on the "English" dropdown menu in the navigation bar.
    When User selects a different language from the dropdown list (e.g., German).
    Then The entire website's content is translated into the selected language.

  Scenario: Accessing Club Information
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks on the "Club" tab in the main navigation bar.
    Then A page with information about the club's history, structure, or other relevant details is displayed.

  Scenario: Searching using Search Bar
    Given User opens the homepage: `fcbayern.com/en`
    When User types "Lewandowski" into the search bar.
    When User presses the Enter key.
    Then Search results related to "Lewandowski" are displayed, potentially including news articles, player profiles, or other relevant content.

  Scenario: Visiting the Allianz Arena Page
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks on "Allianz Arena" in the top navigation bar.
    Then A page with information about the Allianz Arena (stadium) is displayed.

  Scenario: Accessing FC Bayern TV
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks on the "FC Bayern TV" tab in the navigation bar.
    Then A page containing FC Bayern TV content is loaded, potentially requiring further navigation or login.

  Scenario: Checking Contact Information
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks on the "Contact" link in the top right corner.
    Then A page with contact information for FC Bayern Munich is displayed, possibly including contact forms or email addresses.

  Scenario: Accessing Fans Section
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks the "Fans" tab in the navigation bar.
    Then A page is displayed containing information relevant to fans of the club.

  Scenario: Navigating to Tickets Section
    Given User opens the homepage: `fcbayern.com/en`
    When User clicks on the "Tickets" tab in the main navigation bar.
    Then A page about ticket purchasing or information about upcoming matches and ticket availability is shown.

  Scenario: Accessing the Online Store from Homepage
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User scrolls to the bottom of the page.
    When User clicks the "Online Store" button.
    Then The FC Bayern Munich online store opens in a new tab or the same tab.

  Scenario: Navigate to Matches Section
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks on the "Matches" tab in the navigation bar.
    Then The page displays the FC Bayern Munich match schedule or related information.

  Scenario: Searching from Homepage
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User types "Lewandowski" into the search bar.
    When User clicks the search icon.
    Then The search results page displays information related to "Lewandowski".

  Scenario: View FC Bayern TV from Homepage
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks on the "FC Bayern TV" tab in the navigation bar.
    Then The page displays content related to FC Bayern TV.

  Scenario: Accessing Allianz Arena Info
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks on the "Allianz Arena" link in the header.
    Then A new page opens with information about the Allianz Arena.

  Scenario: Language Change
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks on the "English" dropdown menu.
    When User selects "Deutsch" from the dropdown menu.
    Then The page content changes to German.

  Scenario: Accessing Contact Information
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks on the "Contact" link in the header.
    Then A new page opens with contact information for FC Bayern Munich.

  Scenario: Navigate to the Club Section
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks the "Club" tab from the main navigation.
    Then The page shows information about the FC Bayern Munich club.

  Scenario: Navigate to the Fans Section
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks the "Fans" tab from the main navigation.
    Then The page shows information related to FC Bayern Munich fans.

  Scenario: Navigate to the Tickets Section
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load completely.
    When User clicks on "Tickets" in the top navigation menu.
    Then User is directed to the page showing ticket information, availability, and purchasing options.

  Scenario: Navigate to FC Bayern TV from Homepage
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks on the "FC Bayern TV" tab in the navigation bar.
    Then User is navigated to the FC Bayern TV section of the website.

  Scenario: Access the Online Store from Homepage
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to fully load.
    When User clicks the "Online Store" button in the top right corner.
    Then The FC Bayern Online Store opens in a new tab or the same tab, depending on website configuration.

  Scenario: Search Functionality
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the page to load.
    When User types "Lewandowski" into the search bar.
    When User presses Enter.
    Then The search results page displays information related to "Lewandowski".

  Scenario: Language Change
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the page to load.
    When User clicks on the "English" dropdown menu.
    When User selects "Deutsch" from the dropdown menu.
    Then The website's language changes to German.

  Scenario: Navigate to News Section
    Given User opens the browser and goes to `fcbayern.com/en`.
    When User observes the main navigation bar.
    When User clicks on the "News" tab in the navigation bar.
    Then The website displays the latest news articles.

  Scenario: Access Allianz Arena Information
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to load.
    When User clicks on "Allianz Arena" link in the navigation bar.
    Then A new page opens with information regarding the Allianz Arena.

  Scenario: Navigate to "Teams" Section
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to load.
    When User clicks the "Teams" tab in the navigation bar.
    Then The page shows information about the different FC Bayern teams.

  Scenario: Check Contact Information
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to load.
    When User clicks on "Contact" in the top navigation bar.
    Then A page with contact information (e.g., address, email, phone) is displayed.

  Scenario: Access Tickets Section
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to load completely.
    When User clicks on "Tickets" in the top navigation menu.
    Then User is directed to the page showing ticket information, availability, and purchasing options.

  Scenario: View Club Information
    Given User opens the browser and navigates to `fcbayern.com/en`.
    When User waits for the homepage to load.
    When User clicks on the "Club" tab in the navigation bar.
    Then The website displays information about the FC Bayern club.

  Scenario: Navigate to Champions League News from Homepage
    Given User opens the browser and navigates to `fcbayern.com/en/news`
    When User observes the main navigation bar.
    When User clicks on the "Champions League" tab.
    Then The page displays news articles related to the Champions League.

  Scenario: Access FC Bayern Women's News
    Given User opens `fcbayern.com/en/news` in their browser.
    When User scrolls down to view available news sections.
    When User clicks the "FC Bayern Women" news section link.
    Then The page displays news articles specifically about the FC Bayern Women's team.

  Scenario: Search for Specific News Using Search Bar
    Given User opens the homepage (`fcbayern.com/en/news`).
    When User locates the search bar labeled "Search News".
    When User types "Lewandowski" into the search bar and presses Enter.
    Then The search results page displays search results containing the term "Lewandowski".