import { config } from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import fetch from 'node-fetch';

config();

const openai = new OpenAI({
    apiKey: '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',
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost',
        'X-Title': 'test-case-generator'
    }
});

const GEMINI_API_KEY = 'AIzaSyCIthqkPnlYXsnxKjAk1yTMFrPaaZ_YJec';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function buildPrompt(feature: string): string {
    return `
You are a QA engineer helping generate detailed functional test cases.

Feature to test: ${feature}

Each test case must:
- Start from scratch: assume the user just opened the browser.
- ALWAYS begin with opening the homepage related to the tested feature.
- Include ALL user actions: opening the homepage, clicking buttons, typing into fields, etc.
- Use Present Simple tense (e.g., "User opens the homepage", "User clicks the 'Register' button").
- Avoid generic preconditions like "User is on the homepage" — include all navigation steps explicitly.
- Only use preconditions if they are external technical dependencies (e.g., "Account already exists").
- Each test case must be completely independent and MUST NOT reference or rely on previous test cases.
- Test cases must be non-trivial: avoid simple two-step cases unless absolutely necessary.
- Focus on meaningful interaction sequences with at least 3–6 steps.
- Avoid repeating identical steps across different test cases unless logically required.
- Generate a concise but diverse set of 5 to 10 high-quality test cases.

Each test case must contain:
- Test Case Title:
- Steps to Reproduce:
- Expected Result:

Format test cases as a numbered list.
Do not include explanations or additional output.
  `.trim();
}

async function imageToBase64(imagePath: string): Promise<string> {
    const file = await fs.promises.readFile(imagePath);
    return file.toString('base64');
}

async function sendImageToGemini(base64Image: string, prompt: string): Promise<string> {
    const body = {
        contents: [
            {
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: 'image/png',
                            data: base64Image,
                        },
                    },
                ],
                role: 'user',
            },
        ],
    };

    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        console.error(`❌ Gemini API Error: ${res.statusText}`);
        const error = await res.text();
        console.error(error);
        process.exit(1);
    }

    const json = await res.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No response from Gemini';
}

async function askLLM(featureDescription: string) {
    const prompt = buildPrompt(featureDescription);

    const response = await openai.chat.completions.create({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }]
    });

    console.log('\n📋 Generated Test Cases:\n');
    console.log(response.choices[0].message.content);
}

async function main() {
    const args = process.argv.slice(2);
    if (!args.length) {
        console.error('❌ Please provide a feature description or use --image <path>');
        process.exit(1);
    }

    let featureDescription = '';

    if (args[0] === '--image') {
        const imagePath = args[1];
        if (!imagePath || !fs.existsSync(imagePath)) {
            console.error('❌ Please provide a valid image path');
            process.exit(1);
        }
        console.log('🔍 Analyzing screenshot using Gemini...');
        const base64 = await imageToBase64(imagePath);
        const geminiPrompt = `You are a QA engineer. Analyze this UI and generate 5 test cases based on visible elements. Each test case must include:\n- 🧪 Test Case Title\n- 🧭 Steps to Reproduce\n- ✅ Expected Result\nUse Present Simple. Assume this is a modern registration page.`;
        featureDescription = await sendImageToGemini(base64, geminiPrompt);
    } else {
        featureDescription = args.join(' ');
    }

    await askLLM(featureDescription);
}

main();