import fs from 'fs';
import readline from 'readline';

export function createReadLineStream(fileName: string) {
    const fileStream = fs.createReadStream(fileName);
    const readLine = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    return readLine;
}
