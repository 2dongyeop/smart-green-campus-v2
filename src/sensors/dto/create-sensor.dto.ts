import { SensorName } from '../sensor-name.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  sensor_name: SensorName;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  value: number;
}
