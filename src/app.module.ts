import { Module } from '@nestjs/common';
import { SensorModule } from './sensors/sensor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), SensorModule, AuthModule, UserModule],
})
export class AppModule {}
