import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { parse } from 'csv';
import { User } from './user.entity';


@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async processCsv(filePath: string): Promise<void> {
    const readStream = createReadStream(filePath);

    const parser = parse({
      columns: true,
      skip_empty_lines: true,
    });

    parser.on('readable', async () => {
      let record;
      while ((record = parser.read())) {
        const user = new User();
        user.name = record.name;
        user.email = record.email;
        user.password = record.password;

        await this.userRepository.save(user);
      }
    });

    readStream.pipe(parser);
  }
}

