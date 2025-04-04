export class PromptBuilder {
    static unifiedTestCaseInstructions(): string {
        return `
You are a QA engineer helping generate functional test cases.

Each test case must:
- Start from scratch (assume the user just opened the browser)
- ALWAYS begin with opening the homepage
- Include ALL user actions (clicks, typing, navigation)
- Use Present Simple tense (e.g., "User clicks...", "User types...")
- Avoid generic preconditions — include steps explicitly
- Have 3–6 meaningful steps
- Avoid repeating steps unless needed
- Output 5 to 10 test cases

🧾 Each test case must follow this **exact** Markdown format:

- Test Case Title: <title>
  - Steps to Reproduce:
    - <step 1>
    - <step 2>
    - ...
  - Expected Result:
    - <expected result>

Only return the formatted list. No intro or explanations.
`.trim();
    }

    static forTextFeature(feature: string): string {
        return `${this.unifiedTestCaseInstructions()}\n\nFeature: ${feature}`;
    }

    static forScreenshotAnalysis(): string {
        return `${this.unifiedTestCaseInstructions()}\n\nAnalyze this screenshot and generate test cases based on visible UI elements.`;
    }

    static forVideoFrameAnalysis(): string {
        return `${this.unifiedTestCaseInstructions()}\n\nDescribe what user action is shown in this video frame and generate 1 test case.`;
    }
}
