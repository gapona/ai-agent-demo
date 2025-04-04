## 🧪 Run Commands

| Action                                            | Command                                                                                         |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------|
| ▶️ Generate test cases from a prompt              | `npm run generate -- "user registration flow"`                                                  |
| ▶️ Generate test cases from a screenshot          | `npm run generate:image -- ./agents/test-case-generator/screenshots/img.png`                    |
| ▶️ Generate test cases from a recording           | `npm run generate:video -- ./agents/test-case-generator/recording/rec.mp4`                      |
| 📄 Export Gherkin from prompt test cases          | `npm run generate:gherkin -- "User_registration_flow"`                                          |
| 📄 Export Gherkin from screenshot test cases      | `npm run generate:gherkin -- "Img"`                                                             |
| 📄 Export Gherkin from video test cases           | `npm run generate:gherkin -- "Rec"`                                                             |
| 🛠️ Generate step definitions from .feature files | `npm run generate:steps -- ./agents/test-case-generator/generated/User_registration_fl.feature` |