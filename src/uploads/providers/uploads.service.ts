import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { FileType } from '../enums/file-types.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject the upload to aws provider to handle file uploads.
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    /**
     * Inject the upload repository
     */
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    /**
     * Inject config service
     */
    private readonly configService: ConfigService,
  ) {}
  async uploadfile(file: Express.Multer.File) {
    // throw an error for unsupported file types
    if (
      !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Unsupported file mimetype');
    }
    try {
      // upload file to aws s3
      const name = await this.uploadToAwsProvider.fileUpload(file);
      // create a new upload record in the database
      const uploadFile: UploadFile = {
        name: name,
        path: `${this.configService.get<string>('appConfig.awsCloudFrontUrl')}/${name}`,
        type: FileType.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadRepository.create(uploadFile);
      return await this.uploadRepository.save(upload);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new ConflictException(error);
    }
  }
}
