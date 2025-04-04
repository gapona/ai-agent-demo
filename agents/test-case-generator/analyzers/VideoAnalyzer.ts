import fs from 'fs';
import ffmpegPath from 'ffmpeg-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import { GeminiClient } from '../ai-clients/GeminiClient';
import { PromptBuilder } from '../prompt/PromptBuilder';


export class VideoAnalyzer {
    constructor(private gemini: GeminiClient) {}

    private async extractFrames(videoPath: string, outputDir: string): Promise<void> {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        return new Promise((resolve, reject) => {
            fluentFfmpeg(videoPath)
                .setFfmpegPath(ffmpegPath!)
                .outputOptions(['-r 1'])
                .output(`${outputDir}/frame%04d.png`)
                .on('end', () => resolve())
                .on('error', reject)
                .run();
        });
    }

    async analyzeVideo(videoPath: string): Promise<string> {
        const tempDir = './temp_frames';
        await this.extractFrames(videoPath, tempDir);

        const frameFiles = fs.readdirSync(tempDir)
            .filter(file => file.endsWith('.png'))
            .slice(0, 5);

        let fullDescription = '';

        for (const frame of frameFiles) {
            const file = fs.readFileSync(`${tempDir}/${frame}`);
            const base64 = file.toString('base64');
            const response = await this.gemini.sendImage(base64, PromptBuilder.forVideoFrameAnalysis());

            fullDescription += response + '\n';
            await new Promise(r => setTimeout(r, 5000));
        }

        fs.rmSync(tempDir, { recursive: true, force: true });

        return fullDescription;
    }
}
