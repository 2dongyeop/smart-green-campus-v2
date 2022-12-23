import { IsNotEmpty } from 'class-validator';
import { SensorName } from '../sensor-name.enum';

export class ReadSensorDto {
  id: number;

  @IsNotEmpty()
  sensor_name: SensorName;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  value: number;
}
