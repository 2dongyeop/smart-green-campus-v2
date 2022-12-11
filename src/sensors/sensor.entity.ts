import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SensorName } from './sensor-name.enum';

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
}
