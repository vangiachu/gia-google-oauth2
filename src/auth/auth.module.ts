import { Module } from '@nestjs/common';
import { Authcontroller } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';

@Module({
  controllers: [Authcontroller],
  providers: [GoogleStrategy],
})
export class AuthModule {}
