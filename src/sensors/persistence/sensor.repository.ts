import { Repository } from 'typeorm';
import { Sensor } from './sensor.entity';

export class SensorRepository extends Repository<Sensor> {}
