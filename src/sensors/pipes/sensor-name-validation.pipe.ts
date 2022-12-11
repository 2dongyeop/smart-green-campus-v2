import { BadRequestException, PipeTransform } from '@nestjs/common';
import { SensorDivision } from '../sensor.model';

export class SensorNameValidationPipe implements PipeTransform {
  readonly SensorNameOptions = [
    SensorDivision.TEMPERATURE,
    SensorDivision.HUMMIDITY,
    SensorDivision.SOLAR,
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
