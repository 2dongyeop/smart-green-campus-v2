import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { SensorService } from './sensor.service';
import { Sensor, SensorDivision } from './sensor.model';
import { CreateSensorDto } from './dto/create-sensor.dto';

@Controller('sensors')
export class SensorController {
  constructor(private sensorsService: SensorService) {}

  @Get('/')
  getAllSensors(): Sensor[] {
    return this.sensorsService.getAllSensors();
  }

  @Get('/:id')
  getSensorById(@Param('id') id: string): Sensor {
    return this.sensorsService.getSensorById(id);
  }

  @Post()
  createSensor(@Body() createSensorDto: CreateSensorDto): Sensor {
    return this.sensorsService.createSensor(createSensorDto);
  }

  @Delete('/id')
  deleteSensor(@Param('id') id: string): void {
    return this.sensorsService.deleteSensor(id);
  }

  @Patch('/:id/value')
  updateSensorValue(@Param('id') id: string, @Body('value') value: number) {
    return this.sensorsService.updateSensorValue(id, value);
  }
}
