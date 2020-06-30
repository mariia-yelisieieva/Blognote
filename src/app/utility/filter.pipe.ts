import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filter: string, ...properties: string[]): any[] {
    if (!filter || value.length == 0) {
      return value;
    }

    let result: any[] = [];
    for (const element of value) {
      for (const property of properties) {
        if (element[property].toLowerCase().includes(filter.toLowerCase())) {
          result.push(element);
        }
      }
    }
    return result;
  }

}
