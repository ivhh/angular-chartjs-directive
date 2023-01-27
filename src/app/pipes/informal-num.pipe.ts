import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns object from parent object
 */
@Pipe({
  name: 'informalTruncate',
})
export class InformalNumberTruncatePipe implements PipeTransform {
  /**
   * Transform
   *
   * @param value: any
   */
  transform(value: number): string {
    if (Math.abs(value) < 100000) {
      return value.toLocaleString('de-DE', { maximumFractionDigits: 2 });
    } else if (Math.abs(value) < 1000000) {
      return (
        (Math.trunc(value / 100) / 10).toLocaleString('de-DE', {
          maximumFractionDigits: 2,
        }) + 'K'
      );
    } else {
      return (
        (Math.trunc(value / 100000) / 10).toLocaleString('de-DE', {
          maximumFractionDigits: 2,
        }) + 'M'
      );
    }
  }
}
