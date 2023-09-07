import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform<T>(list: T, sertedField: string): T | undefined {
    if (!Array.isArray(list)) return;
    list.sort((beforeItem, afterItem) => {
      if (beforeItem[sertedField] < afterItem[sertedField]) {
        return -1;
      } else if (beforeItem[sertedField] > afterItem[sertedField]) {
        return 1;
      } else {
        return 0;
      }
    });
    return list;
  }
}
//! Exemplo de uso: *ngFor="let pessoa of pessoas | orderBy:'nome'"
