export class ResponseAnalyzer {
    static generateTestFromResponse(json: any): string {
        const lines: string[] = [];

        lines.push(`import { expect, test } from '@playwright/test';`);
        lines.push(``);
        lines.push(`test('validate response structure', async () => {`);
        lines.push(`  const response = ${JSON.stringify(json, null, 2)};`);
        lines.push(``);
        lines.push(`  expect(response.status).toBe(${json.status});`);

        Object.keys(json.body || {}).forEach(key => {
            lines.push(`  expect(response.body.${key}).toBeDefined();`);
        });

        lines.push(`});`);
        return lines.join('\n');
    }
}
