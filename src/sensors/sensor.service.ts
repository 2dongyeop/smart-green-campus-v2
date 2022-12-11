import { Get, Injectable } from '@nestjs/common';
import { Sensor, SensorDivision } from './sensor.model';
import { v1 as uuid } from 'uuid';
import { CreateSensorDto } from "./dto/create-sensor.dto";

@Injectable()
export class SensorService {
  private sensors: Sensor[] = [];

  getAllSensors(): Sensor[] {
    return this.sensors;
  }

  getSensorById(id: string): Sensor {
    return this.sensors.find((sensor) => sensor.id === id);
  }

  createSensor(createSensorDto: CreateSensorDto) {
    const { sensor_name, location, value } = createSensorDto;

    const sensor: Sensor = {
      id: uuid(),
      sensor_name,
      location,
      value,
    };

    this.sensors.push(sensor);
    return sensor;
  }

  deleteSensor(id: string): void {
    this.sensors = this.sensors.filter((sensor) => sensor.id !== id);
  }

  updateSensorValue(id: string, value: number): Sensor {
    const sensor = this.getSensorById(id);
    sensor.value = value;
    return sensor;
  }
}
