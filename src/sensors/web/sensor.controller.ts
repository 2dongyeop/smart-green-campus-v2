import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SensorService } from '../application/sensor.service';
import { SensorName } from './sensor-name.enum';
import { SensorNameValidationPipe } from './pipes/sensor-name-validation.pipe';
import { Sensor } from '../persistence/sensor.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/user.entity';

@Controller('sensors')
@UseGuards(AuthGuard())
export class SensorController {
  private logger = new Logger('BoardController');
  constructor(private sensorsService: SensorService) {}

  @Get('/')
  getAllSensors(@GetUser() user: User): Promise<Sensor[]> {
    this.logger.verbose(`User ${user.username} trying to get all sensors`);
    return this.sensorsService.getAllSensors(user);
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
    @GetUser() user: User,
  ): Promise<Sensor> {
    this.logger.verbose(`User ${user.username} create a new sensor.`);
    return this.sensorsService.createSensor(sensor_name, location, value, user);
  }

  @Delete('/:id')
  deleteSensor(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.sensorsService.deleteSensor(id, user);
  }

  @Patch('/:id/value')
  updateSensorValue(
    @Param('id', ParseIntPipe) id: number,
    @Body('value') value: number,
  ): Promise<Sensor> {
    return this.sensorsService.updateSensorValue(id, value);
  }
}
