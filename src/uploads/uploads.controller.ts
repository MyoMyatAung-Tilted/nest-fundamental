import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    /**
     * Inject the UploadsService to handle file uploads.
     * */
    private readonly uploadsService: UploadsService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer token' },
  ])
  @ApiOperation({
    summary: 'Upload a file',
    description: 'Endpoint to upload a file to the server.',
  })
  @Post('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.uploadfile(file);
  }
}
