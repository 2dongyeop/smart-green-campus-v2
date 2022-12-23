import { Injectable, NotFoundException } from '@nestjs/common';
import { Sensor } from '../persistence/sensor.entity';
import { SensorRepository } from '../persistence/sensor.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/persistence/user.entity';
import { ReadSensorDto } from '../web/dto/read-sensor.dto';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: SensorRepository,
  ) {}

  async getAllSensors(user: User): Promise<ReadSensorDto[]> {
    const query = this.sensorRepository.createQueryBuilder('sensor');

    query.where('sensor.user_id = :user_id', { user_id: user.id });

    const sensors = await query.getMany();
    return sensors;
  }

  async getSensorById(id: number): Promise<Sensor> {
    const found = await this.sensorRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Can't find Sensor with id ${id}`);
    }

    return found;
  }

  async createSensor(sensor_name, location, value, user): Promise<Sensor> {
    const sensor = this.sensorRepository.create({
      sensor_name,
      location,
      value,
      user,
    });

    await this.sensorRepository.save(sensor);
    return sensor;
  }

  async deleteSensor(id: number, user: User): Promise<void> {
    const result = await this.sensorRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`해당 Id를 가진 재고는 존재하지 않습니다.`);
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
