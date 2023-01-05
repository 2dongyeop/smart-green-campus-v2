export class UpdateSensorDto {
  location?: string;
  sensor_name?: object;
  value?: number;
  generateChanges(): object {
    return {
      sensor_name: this.sensor_name,
      location: this.location,
      value: this.value,
    };
  }
}
