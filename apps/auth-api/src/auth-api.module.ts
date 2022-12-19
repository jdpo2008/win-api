import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { DatabaseModule } from '@lib/common';
import { AuthApiController } from './auth-api.controller';
import { AuthApiService } from './auth-api.service';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth-api/.env',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [AuthApiController],
  providers: [AuthApiService, LocalStrategy, JwtStrategy],
})
export class AuthApiModule {}
