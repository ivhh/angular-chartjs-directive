import { ChartType, Point } from 'chart.js';
import { ChartAxis, ChartSerie } from '../models';
import { IChartOptions } from '../interfaces';
import { IndexAxis } from '../types';
import { InformalNumberTruncatePipe } from '../../pipes/informal-num.pipe';
import { formatter } from '../helpers/datalabels.helper';

const getValue = function (variable, defaultValue) {
  return typeof variable !== 'undefined' ? variable : defaultValue;
};

export class ChartBase implements IChartOptions {
  xAxis: ChartAxis;
  yAxes: ChartAxis[] = [];
  series: ChartSerie[] = [];
  type: ChartType;
  name: string;
  color?: string;
  border?: number;
  fill?: boolean = false;
  spanGaps?: boolean = true;
  tooltip?: boolean;
  tooltipTitle?: boolean;
  tooltipPrefix?: string;
  tooltipSuffix?: string;
  stacked?: boolean;
  indexAxis?: IndexAxis;
  zoom?: { rectStartPoint: Point; rectEndPoint: Point };

  getDatasets() {
    return [];
  }

  getSeriesOpts(serie: ChartSerie) {
    return {};
  }
}

export class CartesianBase extends ChartBase implements IChartOptions {
  override getDatasets() {
    let data = [];
    let datalabel = undefined;
    this.series.forEach((serie) => {
      let bgColor = getValue(serie.color, this.color);
      datalabel = {
        display: serie.showDataLabel ?? false,
        anchor: 'end',
        align: 'top',
        borderRadius: 8,
        backgroundColor: bgColor + 'AA',
        padding: 5,
      };
      if (serie.tooltipPrefix || serie.tooltipSuffix) {
        let datalabelFormatter = (value, ctx) =>
          formatter(
            value,
            ctx,
            serie.tooltipPrefix || '',
            serie.tooltipSuffix || ''
          );
        datalabel['formatter'] = datalabelFormatter;
      }
      if (serie.subtype == 'line') {
        bgColor = bgColor + '66';
      }
      let targetType = getValue(serie.subtype, this.type);
      let newData = {
        label: getValue(serie.name, ''),
        _borderColor: getValue(serie.color, this.color),
        get borderColor() {
          return this._borderColor;
        },
        set borderColor(value) {
          this._borderColor = value;
        },
        backgroundColor: bgColor,
        type: targetType,
        yAxisID: getValue(serie.axisLocation, ChartAxis.AXIS_LOCATION.MAIN),
        borderWidth: this.border,
        lineTension: 0.4,
        fill: this.fill,
        spanGaps: this.spanGaps,
        data: serie.data,
        datalabels: datalabel,
      };
      Object.assign(newData, this.getSeriesOpts(serie));
      data.push(newData);
    });
    return data;
  }
}

export class PieDoughtnutBase extends ChartBase implements IChartOptions {
  override getDatasets() {
    let data = [];
    let newData = {
      backgroundColor: this.series.map((s) => getValue(s.color, this.color)),
      data: this.series.map((s) => s.data),
    };
    data.push(newData);
    return data;
  }
}

export class LabelGroupBarBase extends ChartBase implements IChartOptions {
  constructor() {
    super();
    this.type = 'bar';
  }

  override getDatasets() {
    let data = [];
    let labels = this.series.map((s) => (s.label !== undefined ? s.label : ''));
    labels = labels.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    labels.forEach((label) => {
      let labelSeries = this.series.filter((s) => s.label === label);
      let newData = {
        label: label,
        backgroundColor: labelSeries.map((s) => getValue(s.color, this.color)),
        data: labelSeries.map((s) => s.data),
      };
      data.push(newData);
    });
    return data;
  }
}
