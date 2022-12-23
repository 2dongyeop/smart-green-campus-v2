import { Module } from '@nestjs/common';
import { AuthController } from './web/auth.controller';
import { AuthService } from './application/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './persistence/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import * as process from 'process';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
