import { Module } from '@nestjs/common';
import { SensorModule } from './sensors/sensor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), SensorModule],
})
export class AppModule {}
