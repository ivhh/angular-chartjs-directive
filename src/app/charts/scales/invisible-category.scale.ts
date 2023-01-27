import { CategoryScale } from 'chart.js';

export class InvisibleCategoryScale extends CategoryScale {
  static id = 'invisible-category';
  static defaults = {
    ticks: {
      display: false,
    },
  };
}
