import fs from 'fs';
import path from 'path';
import {config} from 'dotenv';
import {OpenAIClient} from "../../ai-clients/OpenAIClient";
import {ApiPromptBuilder} from "../prompt/ApiPromptBuilder";
import {ResponseAnalyzer} from "../analyzers/ResponseAnalyzer";
import {GeminiClient} from "../../ai-clients/GeminiClient";


config();

const responsePath = process.argv[2];
if (!responsePath) {
    console.error('❌ Provide path to response.json');
    process.exit(1);
}

(async () => {
    const response = JSON.parse(fs.readFileSync(responsePath, 'utf-8'));

    const prompt = ApiPromptBuilder.forResponseAnalysis(response);

    const ai = new GeminiClient();
    const testCode = await ResponseAnalyzer.generateTestFromResponse(response); // ✅ async-метод

    const outputDir = path.join('agents', 'api-test-generator', 'generated');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, {recursive: true});

    const outputPath = path.join(outputDir, 'test-from-response.spec.ts');
    fs.writeFileSync(outputPath, testCode);

    console.log(`✅ AI-based test file created: ${outputPath}`);
})();