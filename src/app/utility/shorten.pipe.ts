import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return ([...value].splice(0, limit).join("")) + "...";
    } else {
      return value;
    }
  }

}
