import { ChartAxis, ChartSerie } from '../models';
import { PieDoughtnutBase } from './base.option';

export class PieChart extends PieDoughtnutBase {
  xAxis: ChartAxis = null;
  yAxes: ChartAxis[] = [];
  name: string = 'pie-chart';
  tooltip: boolean = true;
  showYAxis: boolean = false;

  constructor(
    series: ChartSerie[],
    tooltipSufix?: string,
    tooltipTitle?: boolean
  ) {
    super();
    this.type = 'pie';
    this.series = series;
    this.tooltipTitle = tooltipTitle;
    this.tooltipSuffix = tooltipSufix;
  }
}
