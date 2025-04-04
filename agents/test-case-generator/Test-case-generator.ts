import { config } from 'dotenv';
import { GeminiClient } from './ai-clients/GeminiClient';
import { OpenAIClient } from './ai-clients/OpenAIClient';
import { PromptBuilder } from './prompt/PromptBuilder';
import { ImageAnalyzer } from './analyzers/ImageAnalyzer';
import { VideoAnalyzer } from './analyzers/VideoAnalyzer';

config();

async function testCaseGenerator() {
    const args = process.argv.slice(2);
    if (!args.length) {
        console.error('❌ Please provide a feature description or use --image <path> or --video <path>');
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
    } else {
        featureDescription = args.join(' ');
    }

    const prompt = PromptBuilder.forTextFeature(featureDescription);
    const result = await openai.generateTestCases(prompt);

    console.log('\n📋 Generated Test Cases:\n');
    console.log(result);
}

testCaseGenerator();
