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
        const parsed = JSON.stringify(response, null, 2);

        // Собираем список допустимых полей из JSON body (1 уровень)
        const bodyFields = Object.entries((response as any)?.body || {})
            .map(([key, value]) => `- ${key}: ${typeof value}`)
            .join('\n');

        return `
You are a senior QA automation engineer.

Generate a single TypeScript file with 3 Playwright API tests based on the following mocked JSON response.

✅ IMPORTANT RULES:

- The JSON object is always structured like this:
  {
    status: number,
    body: {
      id: number,
      username: string,
      email: string
    }
  }

- Use only those fields.
- Always access them as: data.status, data.body.id, data.body.username, data.body.email
- Do not rename, alias, or transform the data object.
- Do not omit any of these fields unless simulating missing fields in a negative test.

- Do NOT use markdown or wrap code in \`\`\`ts or \`\`\`
- Use ONLY raw TypeScript code
- Use variable: \`data\` for parsed JSON
- Access fields like: \`data.status\`, \`data.body.id\`, etc.
- The JSON will be loaded using: \`const data = JSON.parse(await fs.readFile(...))\`
- Do NOT assume or invent any fields — use ONLY the ones below
- Do NOT modify the loaded JSON object (no reassignment like data.body.id = ...)
- Treat the loaded JSON as read-only
- Never add, delete, or mutate fields in the JSON object
- Only use expect(...) assertions to check its existing structure and values
- If you need edge-case values (nulls, empty strings, etc), create a separate mock object inside the test — do not mutate data


Available fields (inside \`data.body\`):
${bodyFields}

Test requirements:

1. ✅ Positive test:
   - Validate correct field values and types
   - Use \`toBe\`, \`toBeDefined\`, etc.

2. ❌ Negative test:
   - Simulate missing or invalid values
   - Do NOT crash on missing fields
   - Use \`toBeUndefined()\`, \`not.toHaveProperty()\`, or \`not.toBe(...)\`

3. ⚠️ Edge-case test:
   - Use empty strings, large numbers, nulls, unusual formats
   - Still validate structure and expected reactions

ESM Setup:

- Use \`fs/promises\`, \`path\`, \`url\` modules
- Use \`import.meta.url\` + \`fileURLToPath\` + \`path.dirname\` to resolve file path
- Load JSON from \`../input/response.json\`

Return only valid TypeScript code with three Playwright \`test(...)\` blocks.
`.trim();
    }


}