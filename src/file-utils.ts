import { glob } from "glob";

/** Returns the ids of all the files existing in the output folder */
export async function getPathsFromOutput(baseDir: string) {
    let files = await glob(`${baseDir}/**/*.mp3`, {
        nodir: true,
        withFileTypes: true,
    });
    return files.map(f=>f.name);
}