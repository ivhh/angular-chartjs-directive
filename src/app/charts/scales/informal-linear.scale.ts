import { LinearScale } from 'chart.js';
import { InformalNumberTruncatePipe } from '../../pipes/informal-num.pipe';

export class InformalLinearScale extends LinearScale {
  static id = 'informal';
  static defaults = {};
  generateTickLabels(ticks) {
    let i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      tick = ticks[i];
      tick.label = new InformalNumberTruncatePipe().transform(tick.value);
    }
  }
}
