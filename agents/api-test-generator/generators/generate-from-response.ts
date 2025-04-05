import fs from 'fs';
import path from 'path';
import {ResponseAnalyzer} from '../analyzers/ResponseAnalyzer';

const responsePath = process.argv[2];
if (!responsePath) {
    console.error('❌ Provide path to response.json');
    process.exit(1);
}

const response = JSON.parse(fs.readFileSync(responsePath, 'utf-8'));

const testCode = ResponseAnalyzer.generateTestFromResponse(response);

const outputDir = path.join('agents', 'api-test-generator', 'generated');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, 'test-from-response.spec.ts');
fs.writeFileSync(outputPath, testCode);

console.log(`✅ Test file created: ${outputPath}`);
