import { Controller, Get } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';

@Controller()
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get()
  getHello(): string {
    return this.externalApiService.getHello();
  }
}
