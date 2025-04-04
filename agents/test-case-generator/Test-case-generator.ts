import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { GherkinExporter } from './GherkinExporter';
import { GeminiClient } from './ai-clients/GeminiClient';
import { OpenAIClient } from './ai-clients/OpenAIClient';
import { PromptBuilder } from './prompt/PromptBuilder';
import { ImageAnalyzer } from './analyzers/ImageAnalyzer';
import { VideoAnalyzer } from './analyzers/VideoAnalyzer';

config();

async function testCaseGenerator() {
    const args = process.argv.slice(2);
    if (!args.length) {
        console.error('❌ Please provide a feature description or use --image <path>, --video <path>, or --export <title>');
        process.exit(1);
    }

    const gemini = new GeminiClient();
    const openai = new OpenAIClient();

    let featureDescription = '';

    if (args[0] === '--image') {
        const imagePath = args[1];
        const analyzer = new ImageAnalyzer(gemini);
        console.log('🖼️ Analyzing image...');
        featureDescription = await analyzer.analyzeImage(imagePath);
    } else if (args[0] === '--video') {
        const videoPath = args[1];
        const analyzer = new VideoAnalyzer(gemini);
        console.log('🎬 Analyzing video...');
        featureDescription = await analyzer.analyzeVideo(videoPath);
    } else if (args[0] === '--export') {
        const title = args[1];
        const filePath = path.join('agents/test-case-generator/generated', `${title}.txt`);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ Test case file not found: ${filePath}`);
            process.exit(1);
        }
        const testCases = fs.readFileSync(filePath, 'utf-8');
        const gherkin = GherkinExporter.toFeatureFile(title, testCases);
        fs.writeFileSync(`agents/test-case-generator/generated/${title}.feature`, gherkin);
        console.log(`✅ Gherkin feature file created: ${title}.feature`);
        return;
    } else {
        featureDescription = args.join(' ');
    }

    const prompt = PromptBuilder.forTextFeature(featureDescription);
    const result = await openai.generateTestCases(prompt);

    console.log('\n📋 Generated Test Cases:\n');
    console.log(result);

    // Save the result to a file for subsequent Gherkin generation
    const safeTitle = featureDescription.slice(0, 20).replace(/\s+/g, '_');
    const outputPath = `agents/test-case-generator/generated/${safeTitle}.txt`;
    fs.writeFileSync(outputPath, result);
    console.log(`\n💾 Saved test cases to: ${outputPath}`);
}

testCaseGenerator();
