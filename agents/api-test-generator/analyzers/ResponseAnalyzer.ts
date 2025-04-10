import {GeminiClient} from "../../ai-clients/GeminiClient";
import {ApiPromptBuilder} from "../prompt/ApiPromptBuilder";

export class ResponseAnalyzer {
    static async generateTestFromResponse(json: any): Promise<string> {
        const prompt = ApiPromptBuilder.forResponseAnalysis(json);
        const gemini = new GeminiClient();

        try {
            const result = await gemini.sendMessage(prompt);
            return result;
        } catch (err) {
            console.warn("⚠️ Gemini failed. Falling back to static generator.");

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
}
