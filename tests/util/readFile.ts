import { readFileSync } from 'fs';
import { resolve } from 'path';

export function readFile(relativePath) {
    return readFileSync(resolve(__dirname, '../' + relativePath), 'utf-8');
}

export function readJSONFile(relativePath) {
    return JSON.parse(readFile(relativePath));
}
