import { Module } from '@nestjs/common';
import { SensorController } from './web/sensor.controller';
import { SensorService } from './application/sensor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './persistence/sensor.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), AuthModule],
  controllers: [SensorController],
  providers: [SensorService],
})
export class SensorModule {}
