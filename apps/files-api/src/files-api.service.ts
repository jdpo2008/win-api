import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectRequest, S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import * as fs from 'fs';

@Injectable()
export class FilesApiService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async upload(file: Express.Multer.File, folder: string) {
    const s3Client = new S3Client({
      endpoint: this.configService.get<string>('DO_SPACES_ENDPOINT'),
      forcePathStyle: false,
      region: 'nyc3',
      credentials: {
        accessKeyId: this.configService.get<string>('DO_SPACES_KEY'),
        secretAccessKey: this.configService.get<string>('DO_SPACES_SECRET'),
      },
    });

    // Step 3: Define the parameters for the object you want to upload.
    const params = {
      Bucket: 'win-space-dev',
      Key: `${folder}/${file.filename}`,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(params));

      return `https://nyc3.digitaloceanspaces.com/${params.Bucket}/${params.Key}`;
    } catch (err) {
      console.log('Error', err);

      return err.toString();
    }
  }
}
