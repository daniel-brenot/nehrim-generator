import axios from "axios";
import fs from "fs";


const BASE_URL = "https://api.elevenlabs.io";

export class ElvenAiAPI {

    private headers;

    /**
     * Deletes a voice from ElvenAI
     */
    constructor(apiKey: string) {
        this.headers = { "xi-api-key": apiKey };
    }


    async getVoices() {
        let voices = (await axios.get(`${BASE_URL}/v1/voices`, {headers: this.headers})).data.voices;
        let voiceMap: Record<string, string> = {};
        voices.forEach((voice: any)=>{ voiceMap[voice.name] = voice.voice_id; });
        return voiceMap;
    }

    /**
     * Generates a voice line with the given voice id
     * @param dialog {string} The text to get a audio clip for
     * @param voiceID {string} The id of the voice used to generate the clip
    */
    async generateVoiceLine(dialog: string ,voiceID: string, outFile: string) {
        return new Promise( async res => {
            (await axios.post(
                `${BASE_URL}/v1/text-to-speech/${voiceID}`,
                {
                    "text": dialog,
                    "voice_settings": {
                        "stability": .10,
                        "similarity_boost": .75
                    }
                },
                {
                    headers: {
                        ...this.headers,
                        'Accept': 'audio/mpeg',
                    },
                    responseType: "stream",
                    timeout: 10 * 60000
                }
            )).data.pipe(fs.createWriteStream(outFile)).on("finish", res)
        });
    }
}