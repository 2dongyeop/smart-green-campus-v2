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
import { GetUser } from '../../auth/web/get-user.decorator';
import { User } from '../../auth/persistence/user.entity';
import { ReadSensorDto } from './dto/read-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Controller('sensors')
@UseGuards(AuthGuard())
export class SensorController {
  private logger = new Logger('BoardController');
  constructor(private sensorsService: SensorService) {}

  @Get('/')
  getAllSensors(@GetUser() user: User): Promise<ReadSensorDto[]> {
    this.logger.verbose(`User ${user.username} trying to get all sensors`);
    return this.sensorsService.getAllSensors(user);
  }

  @Get('/:id')
  getSensorById(@Param('id', ParseIntPipe) id: number): Promise<ReadSensorDto> {
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
    this.logger.verbose(`User ${user.username} delete sensor id: ${id}.`);
    return this.sensorsService.deleteSensor(id);
  }

  @Patch('/:id')
  updateSensorValue(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSensorDto: UpdateSensorDto,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User ${user.username} update sensor id: ${id}.`);
    return this.sensorsService.updateSensorValue(id, updateSensorDto);
  }
}
