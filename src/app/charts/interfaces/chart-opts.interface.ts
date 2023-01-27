import { ChartDataset, ChartType, DefaultDataPoint, Point } from 'chart.js';
import { ChartAxis, ChartSerie } from '../models';
import { IndexAxis } from '../types';

/**
 * Chart Options for Chart directive
 */
export interface IChartOptions {
  xAxis: ChartAxis;
  yAxes: ChartAxis[];
  series: ChartSerie[];
  type: ChartType;
  name: string;
  color?: string;
  border?: number;
  fill?: boolean;
  tooltip?: boolean;
  tooltipTitle?: boolean;
  tooltipPrefix?: string;
  tooltipSuffix?: string;
  showLegend?: boolean;
  stacked?: boolean;
  indexAxis?: IndexAxis;
  zoom?: {
    rectStartPoint: Point;
    rectEndPoint: Point;
  };

  getDatasets: () => ChartDataset<ChartType, DefaultDataPoint<ChartType>>[];
  // TODO: change any for
  getSeriesOpts(serie: ChartSerie): any;
}
