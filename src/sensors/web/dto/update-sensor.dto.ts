export class UpdateSensorDto {
  location?: object;
  sensor_name?: string;
  value?: number;
  generateChanges(): object {
    return {
      sensor_name: this.sensor_name,
      location: this.location,
      value: this.value,
    };
  }
}
