import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns object from parent object
 */
@Pipe({
  name: 'numFormat',
})
export class NumberFormatPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param value: any
   * @param args: any
   */
  transform(value: number): string {
    if (value !== undefined)
      return value.toLocaleString('de-DE', { maximumFractionDigits: 2 });
    return undefined;
  }
}
