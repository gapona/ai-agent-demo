import fs from 'fs';
import ffmpegPath from 'ffmpeg-static';
import fluentFfmpeg from 'fluent-ffmpeg';
import { GeminiClient } from '../../ai-clients/GeminiClient';
import { PromptBuilder } from '../prompt/PromptBuilder';

export class VideoAnalyzer {
    constructor(private gemini: GeminiClient) {}

    private async extractFrames(videoPath: string, outputDir: string): Promise<void> {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        return new Promise((resolve, reject) => {
            console.log('📽️ Extracting frames from video...');
            fluentFfmpeg(videoPath)
                .setFfmpegPath(ffmpegPath!)
                .outputOptions(['-r 1'])
                .output(`${outputDir}/frame%04d.png`)
                .on('end', () => {
                    console.log('✅ Frames successfully extracted.');
                    resolve();
                })
                .on('error', error => {
                    console.error('❌ Error while extracting frames:', error);
                    reject(error);
                })
                .run();
        });
    }

    async analyzeVideo(videoPath: string): Promise<string> {
        const tempDir = './temp_frames';
        await this.extractFrames(videoPath, tempDir);

        const frameFiles = fs.readdirSync(tempDir)
            .filter(file => file.endsWith('.png'))
            .slice(0, 5);

        if (frameFiles.length === 0) {
            console.warn('⚠️ No frames extracted from video.');
            return '⚠️ No frames extracted from video.';
        }

        console.log(`🔍 Analyzing ${frameFiles.length} frames...`);

        let fullDescription = '';

        for (const [index, frame] of frameFiles.entries()) {
            console.log(`🧩 Analyzing frame ${frame} (${index + 1}/${frameFiles.length})...`);

            const file = fs.readFileSync(`${tempDir}/${frame}`);
            const base64 = file.toString('base64');

            try {
                const response = await this.gemini.sendImage(
                    base64,
                    PromptBuilder.forVideoFrameAnalysis()
                );

                fullDescription += response + '\n';
                console.log(`✅ Frame ${frame} analyzed.\n`);
            } catch (err) {
                console.error(`❌ Error analyzing frame ${frame}:`, err);
            }

            await new Promise(r => setTimeout(r, 5000));
        }

        fs.rmSync(tempDir, { recursive: true, force: true });
        console.log('🏁 Video analysis completed.');

        return fullDescription.trim();
    }
}
