import { Module } from '@nestjs/common';
import { SensorModule } from './sensors/sensor.module';

@Module({
  imports: [SensorModule],
})
export class AppModule {}
