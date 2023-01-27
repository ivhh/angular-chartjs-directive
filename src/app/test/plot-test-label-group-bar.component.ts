import { Component } from '@angular/core';
import { ChartSerie } from '../charts/models';
import {
  LabelGroupBarChart,
  LabelGroupHorizontalBarChart,
} from '../charts/options';

@Component({
  selector: 'plot-test-label-group-bar',
  templateUrl: './plot-test-label-group-bar.component.html',
})
export class PlotTestLabelGroupBarComponent {
  public audienceAgeChartV: LabelGroupBarChart;
  public audienceAgeChartH: LabelGroupHorizontalBarChart;

  private audienceGenderAge = {
    male: [
      {
        label: '13-17',
        value: 0.11019999999999999,
      },
      {
        label: '18-24',
        value: 0.955,
      },
      {
        label: '25-34',
        value: 3.1954999999999996,
      },
      {
        label: '35-44',
        value: 1.2121,
      },
      {
        label: '45-64',
        value: 0.3673,
      },
      {
        label: '65-',
        value: 0.0,
      },
    ],
    female: [
      {
        label: '13-17',
        value: 2.9966,
      },
      {
        label: '18-24',
        value: 29.115999999999996,
      },
      {
        label: '25-34',
        value: 45.0102,
      },
      {
        label: '35-44',
        value: 14.9056,
      },
      {
        label: '45-64',
        value: 2.1316,
      },
      {
        label: '65-',
        value: 0.0,
      },
    ],
  };

  constructor() {
    this.fillageCharts();
  }

  private fillageCharts() {
    let series = [];
    ['male', 'female'].forEach((gender) => {
      let targetData =
        gender === 'female'
          ? this.audienceGenderAge.female
          : this.audienceGenderAge.male;
      targetData.forEach((data) => {
        let serie = new ChartSerie();
        serie.name = data['label'];
        serie.color = gender === 'female' ? '#ea3c75' : '#004f94';
        serie.data = data['value'];
        // TODO: change
        serie.label = gender === 'male' ? 'male' : 'female';
        series.push(serie);
      });
    });
    this.audienceAgeChartV = new LabelGroupBarChart(
      series,
      undefined,
      undefined,
      '+',
      '%',
      true,
      true
    );
    this.audienceAgeChartH = new LabelGroupHorizontalBarChart(
      series,
      'Audience',
      undefined,
      undefined,
      '+',
      '%',
      true,
      true,
      false
    );
  }
}
