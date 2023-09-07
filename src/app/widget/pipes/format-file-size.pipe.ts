import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = [
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Gigabytes',
  'Pettabytes',
  'Exabytes',
  'Zettabytes',
  'Yottabytes',
];

@Pipe({
  name: 'formatFileSize',
})
export class FormatFileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm = false): string {
    const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);
    const size = sizeInBytes / Math.pow(1024, power);

    return `${Math.round(size * 100) / 100} ${units[power]}`;
  }
}

//! Exemplo de uso: <p>{{ sizeInBytes | formatFileSize }}</p>
