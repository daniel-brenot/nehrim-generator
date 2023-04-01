import { ElvenAiAPI } from "./elven-ai";
import { DialogEntry } from "./types";
import cliProgress from "cli-progress";
import { RubberRateLimiter } from "./rate-limit";
import fs from "fs";

/** Global rate limiter for calling the API (10 second limit) */
export const LIMITER = new RubberRateLimiter(10 * 1000);

export async function generateVoiceLines(api: ElvenAiAPI, voice: string, rows: DialogEntry[]) {

    /** A map of Voice name to <voiceID>  */
    let voiceIDs: Record<string, string>;
    try {
        voiceIDs = await api.getVoices();
    } catch(err) {
        throw new Error("Failed to get voices. Is your API Key valid?")
    }
    let voiceID = voiceIDs[voice];

    if(!voiceID) {
        throw new Error(`No voice found with name ${voice}`);
    }

    if(!fs.existsSync("./out")) {
        fs.mkdirSync("./out");
    }

    const bar = new cliProgress.SingleBar({
        format: `{bar} || {value}/{total} | {eta_formatted}`,
    }, cliProgress.Presets.shades_classic);

    bar.start(rows.length, 0);
    for(let line of rows) {
        await LIMITER.limit();
        fs.writeFileSync(line.filePath, "");
        // await api.generateVoiceLine(line.dialog, voiceID, line.filePath);
        bar.increment();
    }
    bar.stop();

}