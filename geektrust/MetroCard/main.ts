import { MetroSystem } from './metro_system';
import { createReadLineStream } from './utils/read-line-stream';

//

async function main() {
    const fileName = process.argv[2];
    if (!fileName) throw new Error('File Path not entered as param when running the file');

    const readLine = createReadLineStream(fileName);

    //

    const metroSystem = new MetroSystem();

    for await (const data of readLine) {
        metroSystem.actionHandler(data);
    }
}
main();
