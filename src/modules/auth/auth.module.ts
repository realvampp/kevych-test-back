import { Module } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, NestJwtService],
  exports: [AuthService],
  imports: [UsersModule],
})
export class AuthModule {}
