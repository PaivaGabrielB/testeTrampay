import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { Module } from '@nestjs/common';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = file.path;
    await this.csvService.processCsv(filePath);
    return { message: 'CSV file processed successfully' };
  }
}

@Module({
  providers: [CsvService]
})
export class CsvModule {}

