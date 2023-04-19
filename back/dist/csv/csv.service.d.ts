/// <reference types="node" />
import { Readable } from 'stream';
export declare class CsvService {
    parseCsv(stream: Readable): Promise<any[]>;
}
