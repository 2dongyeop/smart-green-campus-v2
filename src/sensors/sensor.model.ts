export interface Sensor {
  id: string;
  sensor_name: SensorDivision;
  location: string;
  value: number;
}

export enum SensorDivision {
  TEMPERATURE = 'TEMPERATURE',
  HUMMIDITY = 'HUMIDITY',
  SOLAR = 'SOLAR',
}
