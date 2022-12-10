import { Get, Injectable } from '@nestjs/common';
import { Sensor, SensorDivision } from './sensor.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class SensorService {
  private sensors: Sensor[] = [];

  getAllSensors(): Sensor[] {
    return this.sensors;
  }

  createSensor(sensor_name: SensorDivision, location: string, value: number) {
    const sensor: Sensor = {
      id: uuid(),
      sensor_name,
      location,
      value,
    };

    this.sensors.push(sensor);
    return sensor;
  }
}
