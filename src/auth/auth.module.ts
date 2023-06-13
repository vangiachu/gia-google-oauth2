import { Module } from '@nestjs/common';
import { Authcontroller } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [Authcontroller],
  providers: [
    GoogleStrategy,
    SessionSerializer, 
    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService,
  }
],
})
export class AuthModule {}
