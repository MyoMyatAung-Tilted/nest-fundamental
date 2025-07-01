import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environments: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsCloudFrontUrl: process.env.AWS_CLOUDFRONT_URL,
}));
