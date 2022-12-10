import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { Sensor, SensorDivision } from './sensor.model';

@Controller('sensors')
export class SensorController {
  constructor(private sensorsService: SensorService) {}

  @Get('/')
  getAllSensors(): Sensor[] {
    return this.sensorsService.getAllSensors();
  }

  @Post()
  createSensor(
    @Body('sensor_name') sensor_name: SensorDivision,
    @Body('location') location: string,
    @Body('value') value: number,
  ): Sensor {
    return this.sensorsService.createSensor(sensor_name, location, value);
  }
}
