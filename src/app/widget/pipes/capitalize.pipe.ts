import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(text: string, allLetters = false): string {
    return allLetters ? text.toUpperCase() : text.charAt(0).toUpperCase() + text.slice(1);
  }
}
//! Exemplo de uso: <p>{{ nome | capitalize : true }}</p>
