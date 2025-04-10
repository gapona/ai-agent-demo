export class ApiPromptBuilder {
    static forOpenApiSpec(spec: string): string {
        return `
You are a QA engineer.

Analyze the following OpenAPI or Swagger specification. Generate Playwright-style TypeScript test cases to verify all endpoints, including:
- Positive test cases
- Negative test cases
- Edge cases

Spec:
${spec}
`.trim();
    }

    static forResponseAnalysis(response: unknown): string {
        return `
You are a senior QA automation engineer.

Generate a TypeScript test using Playwright that validates a mocked API response from a local JSON file.

Requirements:
- Use only valid .ts code — no markdown formatting, no comments
- Use ESM-compatible Node.js
- Use \`import.meta.url\`, \`fileURLToPath\` and \`path.dirname\` to calculate __dirname
- Read JSON from "../input/response.json"
- Use async/await with \`fs/promises\`
- Use Playwright's \`test\` and \`expect\` APIs
- Validate:
  - response.status
  - presence and types of all fields
  - any expected values

JSON Response:
${JSON.stringify(response, null, 2)}

Return only raw TypeScript code.
`.trim();
    }
}