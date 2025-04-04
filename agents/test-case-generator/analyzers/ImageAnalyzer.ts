import fs from 'fs';
import { GeminiClient } from '../ai-clients/GeminiClient';
import { PromptBuilder } from '../prompt/PromptBuilder';

export class ImageAnalyzer {
    constructor(private gemini: GeminiClient) {}

    private async imageToBase64(path: string): Promise<string> {
        const file = await fs.promises.readFile(path);
        return file.toString('base64');
    }

    async analyzeImage(imagePath: string): Promise<string> {
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file not found at: ${imagePath}`);
        }

        const base64 = await this.imageToBase64(imagePath);
        return await this.gemini.sendImage(base64, PromptBuilder.forScreenshotAnalysis());
    }
}
