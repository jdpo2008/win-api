/* eslint-disable prettier/prettier */
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
    // const token = await this.authApiService.login(user, response);
    // return response.status(200).json({ ...user, token });
    return await this.authApiService.login(user, response);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
