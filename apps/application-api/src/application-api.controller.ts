import { Controller, Get } from '@nestjs/common';
import { ApplicationApiService } from './application-api.service';

@Controller()
export class ApplicationApiController {
  constructor(private readonly applicationApiService: ApplicationApiService) {}

  @Get()
  getHello(): string {
    return this.applicationApiService.getHello();
  }
}
