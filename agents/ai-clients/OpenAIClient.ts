import OpenAI from 'openai';
import { config } from 'dotenv';

config();

export class OpenAIClient {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': 'http://localhost',
                'X-Title': 'test-case-generator'
            }
        });
    }

    async generateTestCases(prompt: string): Promise<string> {
        const response = await this.client.chat.completions.create({
            model: 'mistralai/mistral-7b-instruct',
            messages: [{ role: 'user', content: prompt }]
        });

        return response.choices[0].message.content || '⚠️ No response from OpenRouter';
    }
}
