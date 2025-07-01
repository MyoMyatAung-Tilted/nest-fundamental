import * as path from 'path';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(
    /**
     * Inject config service to access AWS configuration.
     */
    private readonly configService: ConfigService,
  ) {}

  async fileUpload(file: Express.Multer.File) {
    try {
      const s3 = new S3();

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('appConfig.awsS3BucketName'),
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      console.error('Error uploading file to AWS S3:', error);
      throw new RequestTimeoutException('File upload failed');
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    const fileName = file.originalname.split('.')[0];
    // Remove whitespace in file name
    const sanitizedFileName = fileName.replace(/\s+/g, '-').trim();
    // extract file extension
    const fileExtension = path.extname(file.originalname);
    // generate timestamp
    const timestamp = new Date().getTime().toString().trim();
    return `${sanitizedFileName}-${timestamp}-${uuidv4()}${fileExtension}`;
  }
}
