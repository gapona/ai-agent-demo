export class GherkinExporter {
    static toFeatureFile(title: string, testCases: string): string {
        const lines = testCases.split('\n').map(l => l.trim()).filter(Boolean);

        let result = `Feature: ${title.replace(/\s+/g, '_')}\n\n`;

        let currentTitle = '';
        let steps: string[] = [];
        let expected: string[] = [];
        let mode: 'steps' | 'expected' | null = null;

        const flush = () => {
            if (currentTitle) {
                result += `  Scenario: ${currentTitle}\n`;

                if (steps.length > 0) {
                    result += `    Given ${steps[0]}\n`;
                    for (let i = 1; i < steps.length; i++) {
                        result += `    When ${steps[i]}\n`;
                    }
                }

                expected.forEach(exp => result += `    Then ${exp}\n`);
                result += `\n`;
            }

            currentTitle = '';
            steps = [];
            expected = [];
            mode = null;
        };

        for (const line of lines) {
            if (line.startsWith('- Test Case Title:')) {
                flush();
                currentTitle = line.replace('- Test Case Title:', '').trim();
            } else if (line.startsWith('- Steps to Reproduce:')) {
                mode = 'steps';
            } else if (line.startsWith('- Expected Result:')) {
                mode = 'expected';
            } else if (line.startsWith('-')) {
                const item = line.replace(/^-\s*/, '').trim();
                if (mode === 'steps') {
                    steps.push(item);
                } else if (mode === 'expected') {
                    expected.push(item);
                }
            }
        }

        flush();

        return result.trim();
    }
}
