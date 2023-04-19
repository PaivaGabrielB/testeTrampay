import * as csv from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class CsvService {
  async parseCsv(stream: Readable): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      stream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
}
}







