import { BadRequestException, PipeTransform } from '@nestjs/common';
import { SensorName } from '../sensor-name.enum';

export class SensorNameValidationPipe implements PipeTransform {
  readonly SensorNameOptions = [
    SensorName.TEMPERATURE,
    SensorName.HUMMIDITY,
    SensorName.SOLAR,
  ];

  transform(sensor_name: any): any {
    // sensor_name = sensor_name.toUpperCase();

    if (!this.isSensorNameValid(sensor_name)) {
      throw new BadRequestException(`${sensor_name} isn't in the option`);
    }

    return sensor_name;
  }

  private isSensorNameValid(sensor_name: any) {
    const index = this.SensorNameOptions.indexOf(sensor_name);
    return index !== -1;
  }
}
