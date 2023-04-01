import fs from "fs";
import CsvReadableStream from "csv-reader";
import AutoDetectDecoderStream from "autodetect-decoder-stream";
import { DialogEntry } from "./types";

/**
 * Processes the CSV at the path provided and uses the processRow function
 * on each row to create the output list from the CSV
 * @param csvPath 
 * @param processRow 
 */
export async function processCSV<T>(csvPath: string, processRow: (row: string[]) => T | null): Promise<T[]> {
    return new Promise(res=>{
        let rows: T[] = [];
        // If failed to guess encoding, default to 1255
        let inputStream = fs
            .createReadStream(csvPath)
            .pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }));
        inputStream
	        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, skipHeader: true }))
	        .on("data", (row: any) =>  {
                let result = processRow(row);
                if(result) rows.push(result);
            })
            .on("end", () => { res(rows); });
    });
}

export function processRow(row: string[]): DialogEntry {
    let [ filePath, dialog ] = row;
    return { filePath, dialog };
}