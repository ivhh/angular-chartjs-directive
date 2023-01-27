import { ChartAxis, ChartSerie } from '../models';
import { CartesianBase } from './base.option';

const defaultBarColors = ['#59ece6bf', '#59ece6bf', '#59ece6bf', '#59ece6bf'];

const defaultLineColors = ['#00358ebf', '#fadb10bf', '#ffaa33bf', '#5d78febf'];

export class BarLineChart extends CartesianBase {
  xAxis: ChartAxis = new ChartAxis();
  yAxes: ChartAxis[] = [];
  series: ChartSerie[] = [];
  name: string = 'barline-chart';

  constructor(
    series: ChartSerie[],
    bins: string[],
    minValue: number,
    maxValue: number,
    optSeries?: ChartSerie[],
    optMinValue?: number,
    optMaxValue?: number,
    yAxisMainLabel?: string,
    xAxisLabel?: string,
    yAxisSecondLabel?: string
  ) {
    super();
    this.type = 'bar';
    this.fill = true;
    if (optSeries !== undefined) {
      let ySecondAxis = new ChartAxis();
      ySecondAxis.type = ChartAxis.AXIS_TYPE.NUMERICAL;
      if (optMinValue == undefined || optMaxValue == undefined) {
        throw new Error('optional series min or max values not defined');
      }
      ySecondAxis.minValue = optMinValue;
      ySecondAxis.maxValue = optMaxValue;
      if (yAxisSecondLabel !== undefined) {
        ySecondAxis.label = yAxisSecondLabel;
      }
      ySecondAxis.location = ChartAxis.AXIS_LOCATION.SECONDARY;
      ySecondAxis.showTicks = false;
      ySecondAxis.scaleType = 'invisible-linear';
      ySecondAxis.grace = '10%';
      this.yAxes.push(ySecondAxis);
      let index = 0;
      optSeries.forEach((serie) => {
        if (!serie.color) {
          serie.color = defaultLineColors[index];
        }
        serie.subtype = 'line';
        serie.axisLocation = ChartAxis.AXIS_LOCATION.SECONDARY;
        this.series.push(serie);
        index++;
      });
    }

    let yMainAxis = new ChartAxis();
    yMainAxis.type = ChartAxis.AXIS_TYPE.NUMERICAL;
    yMainAxis.minValue = minValue;
    yMainAxis.maxValue = maxValue;
    yMainAxis.location = ChartAxis.AXIS_LOCATION.MAIN;
    yMainAxis.format = ChartAxis.FORMAT.INFORMAL;
    yMainAxis.scaleType = 'informal';
    yMainAxis.grace = '10%';
    yMainAxis.grid = true;
    if (yAxisMainLabel !== undefined) {
      yMainAxis.label = yAxisMainLabel;
    }
    this.yAxes.push(yMainAxis);
    let index = 0;
    series.forEach((serie) => {
      serie.subtype = 'bar';
      if (!serie.color) {
        serie.color = defaultBarColors[index];
      }
      serie.axisLocation = ChartAxis.AXIS_LOCATION.MAIN;
      this.series.push(serie);
      index++;
    });
    this.xAxis.type = ChartAxis.AXIS_TYPE.LABEL;
    this.xAxis.labels = bins;
    this.xAxis.showTicks = false;
    this.xAxis.grid = true;
    this.xAxis.scaleType = 'invisible-category';
  }
}
