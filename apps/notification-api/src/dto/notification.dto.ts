/* eslint-disable prettier/prettier */
import {
  IsBase64,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsOptional()
  body?: string;

  @IsString()
  @IsOptional()
  to?: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsOptional()
  cc?: string[];

  @IsBase64()
  @IsOptional()
  attachment?: any;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  html?: string;

  @IsObject()
  @IsOptional()
  context?: any;

  @IsString()
  @IsOptional()
  template?: string;
}
