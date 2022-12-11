import { SensorDivision } from '../sensor.model';
import { IsNotEmpty } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  sensor_name: SensorDivision;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  value: number;
}
