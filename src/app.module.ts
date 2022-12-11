import { Module } from '@nestjs/common';
import { SensorModule } from './sensors/sensor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), SensorModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
