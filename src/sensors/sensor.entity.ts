import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SensorName } from './sensor-name.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Sensor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensor_name: SensorName;

  @Column()
  location: string;

  @Column()
  value: number;

  @ManyToOne((type) => User, (user) => user.sensors, { eager: false })
  user: User;
}
