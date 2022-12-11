import { Injectable, NotFoundException } from '@nestjs/common';
import { Sensor } from './sensor.entity';
import { SensorRepository } from './sensor.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: SensorRepository,
  ) {}

  // getAllSensors(): Sensor[] {
  //   return this.sensors;
  // }

  async getSensorById(id: number): Promise<Sensor> {
    const found = await this.sensorRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Sensor with id ${id}`);
    }

    return found;
  }

  async createSensor(sensor_name, location, value): Promise<Sensor> {
    const sensor = this.sensorRepository.create({
      sensor_name,
      location,
      value,
    });

    await this.sensorRepository.save(sensor);
    return sensor;
  }

  // deleteSensor(id: string): void {
  //   const found = this.getSensorById(id);
  //
  //   this.sensors = this.sensors.filter((sensor) => sensor.id !== found.id);
  // }
  //
  // updateSensorValue(id: string, value: number): Sensor {
  //   const sensor = this.getSensorById(id);
  //   sensor.value = value;
  //   return sensor;
  // }
}
