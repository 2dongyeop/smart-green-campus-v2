import { Module } from '@nestjs/common';
import { UserController } from './web/user.controller';
import { UserService } from './application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './persistence/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
