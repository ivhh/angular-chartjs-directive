import { LinearScale } from 'chart.js';

export class InvisibleLinearScale extends LinearScale {
  static id = 'invisible-linear';
  static defaults = {
    ticks: {
      display: false,
    },
  };
}
