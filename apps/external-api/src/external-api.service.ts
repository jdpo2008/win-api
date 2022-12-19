import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
