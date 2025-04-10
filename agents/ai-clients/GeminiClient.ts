import fetch from 'node-fetch';
import { config } from 'dotenv';

config();

export class GeminiClient {
    private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    //private apiKey = process.env.GEMINI_API_KEY!;
    private apiKey = "AIzaSyB3JI09gYrwJ_spd2yTXtuWbdNnBbX3ZOs";

    async sendImage(base64Image: string, prompt: string): Promise<string> {
        const body = {
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                mimeType: 'image/png',
                                data: base64Image,
                            }
                        }
                    ],
                    role: 'user'
                }
            ]
        };

        for (let attempt = 0; attempt < 3; attempt++) {
            const res = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.status === 429) {
                console.warn(`⏳ Gemini quota hit. Retrying in 30s (attempt ${attempt + 1}/3)...`);
                await new Promise(r => setTimeout(r, 30000));
                continue;
            }

            if (!res.ok) {
                console.error(`❌ Gemini API Error: ${res.statusText}`);
                const error = await res.text();
                console.error(error);
                throw new Error('Gemini failed');
            }

            const json = await res.json();
            return json.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No response from Gemini';
        }

        return '❌ Gemini API failed after retries.';
    }
    async sendMessage(prompt: string): Promise<string> {
        const body = {
            contents: [
                {
                    parts: [{ text: prompt }],
                    role: 'user'
                }
            ]
        };

        for (let attempt = 0; attempt < 3; attempt++) {
            const res = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.status === 429) {
                console.warn(`⏳ Gemini quota hit. Retrying in 30s (attempt ${attempt + 1}/3)...`);
                await new Promise(r => setTimeout(r, 30000));
                continue;
            }

            if (!res.ok) {
                console.error(`❌ Gemini API Error: ${res.statusText}`);
                const error = await res.text();
                console.error(error);
                throw new Error('Gemini failed');
            }

            const json = await res.json();
            return json.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No response from Gemini';
        }

        return '❌ Gemini API failed after retries.';
    }
}
