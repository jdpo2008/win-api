import { User } from '@lib/common';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthApiService } from './auth-api.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Get()
  getHello(): string {
    return this.authApiService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authApiService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
