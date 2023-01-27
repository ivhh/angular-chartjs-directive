import { Component } from '@angular/core';
import { ChartSerie } from '../charts/models';
import { DoughtnutChart, PieChart } from '../charts/options';

@Component({
  selector: 'plot-test-pie-doughtnut',
  templateUrl: './plot-test-pie-doughtnut.component.html',
})
export class PlotTestPieDoughtnutComponent {
  public audienceSexChartD: DoughtnutChart;
  public audienceSexChartP: PieChart;

  constructor() {
    this.fillSexCharts();
  }

  private fillSexCharts() {
    let fserie = new ChartSerie();
    let mserie = new ChartSerie();
    fserie.name = 'female';
    fserie.color = '#ea3c75';
    fserie.data = 30;
    mserie.name = 'male';
    mserie.color = '#004f94';
    mserie.data = 80;
    this.audienceSexChartD = new DoughtnutChart([fserie, mserie], '%', false);
    this.audienceSexChartP = new PieChart([fserie, mserie], '%', false);
  }
}
