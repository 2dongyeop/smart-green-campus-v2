import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorName } from './sensor-name.enum';
import { SensorNameValidationPipe } from './pipes/sensor-name-validation.pipe';
import { Sensor } from './sensor.entity';

@Controller('sensors')
export class SensorController {
  constructor(private sensorsService: SensorService) {}

  @Get('/')
  getAllSensors(): Promise<Sensor[]> {
    return this.sensorsService.getAllSensors();
  }

  @Get('/:id')
  getSensorById(@Param('id', ParseIntPipe) id: number): Promise<Sensor> {
    return this.sensorsService.getSensorById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSensor(
    @Body('sensor_name', SensorNameValidationPipe) sensor_name: SensorName,
    @Body('location') location: string,
    @Body('value') value: number,
  ): Promise<Sensor> {
    return this.sensorsService.createSensor(sensor_name, location, value);
  }

  @Delete('/:id')
  deleteSensor(@Param('id', ParseIntPipe) id: number): void {
    this.sensorsService.deleteSensor(id);
  }

  @Patch('/:id/value')
  updateSensorValue(
    @Param('id', ParseIntPipe) id: number,
    @Body('value') value: number,
  ): Promise<Sensor> {
    return this.sensorsService.updateSensorValue(id, value);
  }
}
