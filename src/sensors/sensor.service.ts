import { Injectable, NotFoundException } from '@nestjs/common';
import { Sensor } from './sensor.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class SensorService {
  private sensors: Sensor[] = [];

  getAllSensors(): Sensor[] {
    return this.sensors;
  }

  getSensorById(id: string): Sensor {
    const found = this.sensors.find((sensor) => sensor.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Sensor with id ${id}`);
    }

    return found;
  }

  createSensor(sensor_name, location, value) {
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
    const found = this.getSensorById(id);

    this.sensors = this.sensors.filter((sensor) => sensor.id !== found.id);
  }

  updateSensorValue(id: string, value: number): Sensor {
    const sensor = this.getSensorById(id);
    sensor.value = value;
    return sensor;
  }
}
