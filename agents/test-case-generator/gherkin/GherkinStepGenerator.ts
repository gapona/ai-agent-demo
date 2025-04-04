import fs from 'fs';
import path from 'path';

const generatedDir = 'agents/test-case-generator/generated';

function toMethodName(step: string): string {
    return step
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+(.)/g, (_, group) => group.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^./, c => c.toLowerCase());
}

function escapeQuotes(text: string): string {
    return text.replace(/'/g, "\\'");
}

function generateStepsFromFeature(featurePath: string) {
    const featureName = path.basename(featurePath, '.feature');
    const featureContent = fs.readFileSync(featurePath, 'utf-8');
    const lines = featureContent.split('\n');

    const uniqueSteps = new Set<string>();
    const steps: { type: string; text: string }[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        const match = /^(Given|When|Then)\s+(.+)$/.exec(trimmed);
        if (match) {
            const [, type, text] = match;
            const fullStep = `${type} ${text}`;
            if (!uniqueSteps.has(fullStep)) {
                uniqueSteps.add(fullStep);
                steps.push({ type, text });
            }
        }
    }

    const methodStubs = steps.map(({ type, text }) => {
        const methodName = toMethodName(text);
        return `    // @ts-ignore\n` +
            `    @${type}('${escapeQuotes(text)}')\n` +
            `    public async ${methodName}(): Promise<void> {\n` +
            `        // TODO: implement step\n` +
            `    }\n`;
    }).join('\n');

    const result = `import { Given, When, Then } from '@cucumber/cucumber';

export class ${featureName}Steps {
${methodStubs}}`;

    const outputPath = path.join(generatedDir, `${featureName}.steps.ts`);
    fs.writeFileSync(outputPath, result);
    console.log(`✅ Step definitions generated: ${outputPath}`);
}

// CLI
const args = process.argv.slice(2);
if (!args[0]) {
    console.error('❌ Please provide path to .feature file');
    process.exit(1);
}
generateStepsFromFeature(args[0]);
