import { processCSV, processRow } from "./csv-utils";
import { ElvenAiAPI } from "./elven-ai";
import { env } from "./environment";
import { getPathsFromOutput } from "./file-utils";
import { generateVoiceLines } from "./main";

const CSV_PATH = "./input.csv";

(async () => {
    let rows = await processCSV(CSV_PATH, processRow);
    // Get the paths of the files that actually exist
    let paths = await getPathsFromOutput("./out");
    console.dir(paths)
    // Remove any rows that already exist in the output
    rows = rows.filter(row=> !paths.includes(row.filePath.substring(row.filePath.lastIndexOf("\\")+1)));

    let api = new ElvenAiAPI(env.ELVENAI_API_KEY);


    await generateVoiceLines(api, env.ELVENAI_VOICE_NAME, rows);

})();