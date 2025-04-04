import {config} from 'dotenv';
import fs from 'fs';
import path from 'path';
import {GherkinExporter} from './GherkinExporter';
import {GeminiClient} from './ai-clients/GeminiClient';
import {OpenAIClient} from './ai-clients/OpenAIClient';
import {PromptBuilder} from './prompt/PromptBuilder';
import {ImageAnalyzer} from './analyzers/ImageAnalyzer';
import {VideoAnalyzer} from './analyzers/VideoAnalyzer';

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
    let result = '';
    const generatedDir = path.join('agents', 'test-case-generator', 'generated');

    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, {recursive: true});
    }

    if (args[0] === '--image') {
        const imagePath = args[1];
        const shouldExport = args.includes('--export');
        const analyzer = new ImageAnalyzer(gemini);
        console.log('🖼️ Analyzing image...');
        featureDescription = await analyzer.analyzeImage(imagePath);
        const prompt = PromptBuilder.forTextFeature(featureDescription);
        result = await openai.generateTestCases(prompt);

        const title = path.basename(imagePath, path.extname(imagePath));
        const safeTitle = title.replace(/\s+/g, '_');

        console.log('\n📋 Generated Test Cases:\n');
        console.log(result);

        const outputPath = path.join(generatedDir, `${safeTitle}.txt`);
        fs.writeFileSync(outputPath, result);
        console.log(`💾 Saved test cases to: ${outputPath}`);

        if (shouldExport) {
            const gherkin = GherkinExporter.toFeatureFile(safeTitle, result);
            const featurePath = path.join(generatedDir, `${safeTitle}.feature`);
            fs.writeFileSync(featurePath, gherkin);
            console.log(`✅ Gherkin feature file created: ${featurePath}`);
        }

        return;
    }

    if (args[0] === '--video') {
        const videoPath = args[1];
        const shouldExport = args.includes('--export');
        const analyzer = new VideoAnalyzer(gemini);
        console.log('🎬 Analyzing video...');
        featureDescription = await analyzer.analyzeVideo(videoPath);
        const prompt = PromptBuilder.forTextFeature(featureDescription);
        result = await openai.generateTestCases(prompt);

        const title = path.basename(videoPath, path.extname(videoPath));
        const safeTitle = title.replace(/\s+/g, '_');

        console.log('\n📋 Generated Test Cases:\n');
        console.log(result);

        const outputPath = path.join(generatedDir, `${safeTitle}.txt`);
        fs.writeFileSync(outputPath, result);
        console.log(`💾 Saved test cases to: ${outputPath}`);

        if (shouldExport) {
            const gherkin = GherkinExporter.toFeatureFile(safeTitle, result);
            const featurePath = path.join(generatedDir, `${safeTitle}.feature`);
            fs.writeFileSync(featurePath, gherkin);
            console.log(`✅ Gherkin feature file created: ${featurePath}`);
        }

        return;
    }

    if (args[0] === '--export') {
        const title = args[1];
        const txtPath = path.join(generatedDir, `${title}.txt`);

        if (!fs.existsSync(txtPath)) {
            console.error(`❌ Test case file not found: ${txtPath}`);
            process.exit(1);
        }

        const testCases = fs.readFileSync(txtPath, 'utf-8');
        const gherkin = GherkinExporter.toFeatureFile(title, testCases);
        const featurePath = path.join(generatedDir, `${title}.feature`);
        fs.writeFileSync(featurePath, gherkin);
        console.log(`✅ Gherkin feature file created: ${featurePath}`);
        return;
    }

    featureDescription = args.join(' ');
    const prompt = PromptBuilder.forTextFeature(featureDescription);
    result = await openai.generateTestCases(prompt);

    console.log('\n📋 Generated Test Cases:\n');
    console.log(result);

    const safeTitle = featureDescription.slice(0, 20).replace(/\s+/g, '_');
    const outputPath = path.join(generatedDir, `${safeTitle}.txt`);
    fs.writeFileSync(outputPath, result);
    console.log(`💾 Saved test cases to: ${outputPath}`);
}

testCaseGenerator();
