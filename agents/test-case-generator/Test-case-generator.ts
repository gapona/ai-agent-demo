import {config} from 'dotenv';
import OpenAI from 'openai';

//add screenshot/video validation for test cases

config();

const openai = new OpenAI({
    apiKey: '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',
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost',
        'X-Title': 'test-case-generator'
    }
});

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

ъ=
Format test cases as a numbered list.
Do not include explanations or additional output.

  `.trim();
}

async function askLLM(featureDescription: string) {
    const prompt = buildPrompt(featureDescription);

    const response = await openai.chat.completions.create({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{role: 'user', content: prompt}]
    });

    console.log('\n📋 Generated Test Cases:\n');
    console.log(response.choices[0].message.content);
}

const input = process.argv.slice(2).join(' ');

if (!input) {
    console.error('❌ Please provide a feature description as an argument.');
    process.exit(1);
}

askLLM(input);
