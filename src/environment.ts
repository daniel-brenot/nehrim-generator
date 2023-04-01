import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
    ELVENAI_API_KEY: str({desc: "API key from ElvenAI"}),
    ELVENAI_VOICE_NAME: str({desc: "The voice to use to generate voice lines"}),
});
