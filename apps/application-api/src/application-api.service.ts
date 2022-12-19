import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
