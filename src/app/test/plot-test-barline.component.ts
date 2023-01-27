import { Component } from '@angular/core';
import { ChartAxis, ChartSerie } from '../charts/models';
import { BarLineChart } from '../charts/options';

@Component({
  selector: 'plot-test-barline',
  templateUrl: './plot-test-barline.component.html',
})
export class PlotTestBarLineComponent {
  public reachBudgetChart: BarLineChart;

  private timeline = [];
  private _distanceMaskSerie: number[];

  constructor() {
    this.timeline = [
      {
        caption: 'Kenzo participan: the power of the bloom',
        date: new Date(2014, 1, 16),
        title: 'Kenzo participan: the power of the bloom',
        content: {
          eng: 15,
          reach: 185020,
          budget: 15000000,
        },
        selected: true,
      },
      {
        caption: 'Subway 1',
        date: new Date(2014, 2, 28),
        title: 'Status#1',
        content: {
          eng: 17,
          reach: 123010,
          budget: 18000000,
        },
      },
      {
        caption: '5 May',
        date: new Date(2014, 4, 5),
        title: 'Status#1',
        content: {
          eng: 2,
          reach: 13500,
          budget: 13000000,
        },
      },
      {
        caption: '5 May 2',
        date: new Date(2014, 4, 5),
        title: 'Status#1',
        content: {
          eng: 239,
          reach: 235090,
          budget: 11000000,
        },
      },
      {
        caption: '5 Oct',
        date: new Date(2015, 9, 5),
        title: 'Status#1',
        content: {
          eng: 23,
          reach: 138010,
          budget: 12000000,
        },
      },
    ];
    this.calcDistance();
    this.fillChart();
  }

  private calcDistance() {
    this._distanceMaskSerie = [
      undefined,
      0,
      undefined,
      undefined,
      1,
      undefined,
      undefined,
      2,
      3,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      4,
      undefined,
    ];
  }

  private fillChart() {
    let secondaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--bs-danger');
    let primaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--bs-success');
    let serie1 = new ChartSerie();

    serie1.data = this._distanceMaskSerie.map((m) =>
      m != undefined ? this.timeline[m]['content']['budget'] : undefined
    );
    serie1.axisLocation = ChartAxis.AXIS_LOCATION.SECONDARY;
    serie1.name = 'budget';
    serie1.tooltipPrefix = '$';
    serie1.color = primaryColor;
    serie1.showDataLabel = true;
    let serie2 = new ChartSerie();
    serie2.data = this._distanceMaskSerie.map((m) =>
      m != undefined ? this.timeline[m]['content']['reach'] : undefined
    );
    serie2.axisLocation = ChartAxis.AXIS_LOCATION.MAIN;
    serie2.subtype = 'bar';
    serie2.color = secondaryColor;
    serie2.name = 'reach';

    let bins = this._distanceMaskSerie.map((m) => m != undefined ? this.timeline[m]['caption'] : '');

    this.reachBudgetChart = new BarLineChart(
      [serie2],
      bins,
      0,
      bins.length - 1,
      [serie1],
      0,
      bins.length - 1
    );
  }
}
