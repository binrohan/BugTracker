import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Local'
})
export class LocalTimePipe implements PipeTransform {

  transform(value: any): any {
    value = value + 'Z';
    const localDate =  new Date(value);
    return localDate;
  }

}
