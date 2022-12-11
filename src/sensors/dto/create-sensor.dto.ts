import { SensorDivision } from '../sensor.model';

export class CreateSensorDto {
  sensor_name: SensorDivision;
  location: string;
  value: number;
}