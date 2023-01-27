import { IndexAxis } from '../types';
import { ChartAxis, ChartSerie } from '../models';
import { LabelGroupBarBase } from './base.option';

const defaultColors = ['#00358ebf', '#fadb10bf', '#ffaa33bf', '#5d78febf'];

export class LabelGroupBarChart extends LabelGroupBarBase {
  xAxis: ChartAxis = new ChartAxis();
  yAxes: ChartAxis[] = [];
  series: ChartSerie[] = [];
  name: string = 'bar-chart';
  indexAxis: IndexAxis = 'x';

  constructor(
    series: ChartSerie[],
    minValue: number,
    maxValue: number,
    tooltipPrefix?: string,
    tooltipSuffix?: string,
    tooltipTitle?: boolean,
    stacked?: boolean
  ) {
    super();
    this.tooltipPrefix = tooltipPrefix;
    this.tooltipTitle = tooltipTitle;
    this.tooltipSuffix = tooltipSuffix;
    this.stacked = stacked;
    this.xAxis.offset = true;
    let yAxis = new ChartAxis();
    yAxis.type = ChartAxis.AXIS_TYPE.NUMERICAL;
    yAxis.minValue = minValue;
    yAxis.maxValue = maxValue;
    yAxis.offset = false;
    this.yAxes.push(yAxis);
    let index = 0;
    series.forEach((serie) => {
      if (!serie.color) {
        serie.color = defaultColors[index];
      }
      index++;
      this.series.push(serie);
    });
  }
}

export class LabelGroupHorizontalBarChart extends LabelGroupBarBase {
  xAxis: ChartAxis = new ChartAxis();
  yAxes: ChartAxis[] = [];
  series: ChartSerie[] = [];
  name: string = 'horizontal-bar-chart';
  tooltip: boolean = true;
  showXAxis: boolean;
  indexAxis: IndexAxis = 'y';

  constructor(
    series: ChartSerie[],
    xAxisLabel?: string,
    minValue?: number,
    maxValue?: number,
    tooltipPrefix?: string,
    tooltipSuffix?: string,
    tooltipTitle?: boolean,
    stacked?: boolean,
    showXAxis = false
  ) {
    super();
    this.tooltipTitle = tooltipTitle;
    this.tooltipPrefix = tooltipPrefix;
    this.tooltipSuffix = tooltipSuffix;
    this.stacked = stacked;
    this.showXAxis = showXAxis;
    this.xAxis.type = ChartAxis.AXIS_TYPE.NUMERICAL;
    if (xAxisLabel) {
      this.xAxis.label = xAxisLabel;
    }
    if (minValue) {
      this.xAxis.minValue = minValue;
    }
    if (maxValue) {
      this.xAxis.maxValue = maxValue;
    }
    this.xAxis.scaleType = 'invisible-linear';
    let index = 0;
    // tslint:disable-next-line: new-parens
    let yAxis = new ChartAxis();
    yAxis.offset = true;
    this.yAxes.push(yAxis);
    series.forEach((serie) => {
      if (!serie.color) {
        serie.color = defaultColors[index];
      }
      index++;
      this.series.push(serie);
    });
  }
}
