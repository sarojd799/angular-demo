import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {

  transform(values: any[], ...args: any[]): unknown {
    if (!values || !values.length || !args || !args.length) return null;
    const [key, value, ...rest] = args;
    return values.filter((item: any) => item[key] === value);
  }

}
