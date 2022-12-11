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

  async getAllSensors(): Promise<Sensor[]> {
    return this.sensorRepository.find();
  }

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

  async deleteSensor(id: number): Promise<void> {
    const result = await this.sensorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Sensor with id ${id}`);
    }
    console.log('result', result);
  }

  async updateSensorValue(id: number, value: number): Promise<Sensor> {
    const sensor = await this.getSensorById(id);

    sensor.value = value;
    await this.sensorRepository.save(sensor);

    return sensor;
  }
}
