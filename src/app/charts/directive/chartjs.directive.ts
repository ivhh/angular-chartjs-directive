import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IChartOptions } from '../interfaces';
import { ChartAxis } from '../models/axis.model';
import Zoom from 'chartjs-plugin-zoom';
import { TranslateService } from '../../services/translate.service';
import { NumberFormatPipe } from '../../pipes/exact-num.pipe';
import { InformalLinearScale } from '../scales/informal-linear.scale';
import { InvisibleLinearScale } from '../scales/invisible-linear.scale';
import { formatter } from '../helpers/datalabels.helper';
import { InvisibleCategoryScale } from '../scales/invisible-category.scale';

@Directive({
  selector: '[chartDir]',
  exportAs: 'chartDir',
})
export class ChartDirective implements AfterViewInit {
  @Input() options: IChartOptions;
  private chart: Chart;

  /**
   * Directive Constructor
   *
   * @param el: ElementRef
   */
  constructor(private el: ElementRef, private translate: TranslateService) {
    Chart.register(...registerables);
    Chart.register(Zoom);
    Chart.register(InformalLinearScale);
    Chart.register(InvisibleLinearScale);
    Chart.register(InvisibleCategoryScale);
    // this.traslate();
    this.translate.onLangChange.subscribe(() => {
      // this.traslate();
      this.updateChart(this.options);
    });
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    // check xAxes and yAxes have two or less items
    if (this.options.yAxes.length > 2) {
      throw new Error('y axes must be 2 or less');
    }
    this.initChart(this.el.nativeElement, this.options);
  }

  setOptsDefaultValues<T extends ChartType>(opts: IChartOptions) {
    // set default values
    opts.type = this.getValue(opts.type, 'line');
    opts.fill = this.getValue(opts.fill, false);
    opts.tooltip = this.getValue(opts.tooltip, true);
    opts.tooltipTitle = this.getValue(opts.tooltipTitle, true);
    opts.tooltipPrefix = this.getValue(opts.tooltipPrefix, '');
    opts.tooltipSuffix = this.getValue(opts.tooltipSuffix, '');
    opts.color = this.getValue(opts.color, '#ff6384');
    opts.stacked = this.getValue(opts.stacked, false);
    opts.showLegend = this.getValue(opts.showLegend, true);
  }

  /**
   * Init chart
   * @param src: any
   * @param name: ChartOptions
   */
  initChart(src, opts: IChartOptions) {
    if (src.length === 0) {
      return;
    }

    this.setOptsDefaultValues(opts);

    let datasets = opts.getDatasets();
    let dataLabels = [];
    dataLabels = opts.series.map((s) => this.translate.instant(s.name));

    dataLabels = dataLabels.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    let legend = {};
    if (opts.showLegend) {
      legend = {
        display: true,
        labels: {
          usePointStyle: false,
          boxWidth: 10,
          fontSize: 11,
          padding: 10,
        },
        fullWidth: false,
      };
    } else {
      legend = {
        display: false,
        labels: {
          usePointStyle: false,
        },
      };
    }

    let xAxisTicks: object;
    let xAxislabel = '';
    let xAxisScaleType = undefined;
    let xAxisShowGrid = false;
    let xAxisOffset = false;

    if (opts.xAxis != null) {
      if (opts.xAxis.offset) {
        xAxisOffset = opts.xAxis.offset;
      }
      if (opts.xAxis.grid) {
        xAxisShowGrid = opts.xAxis.grid;
      }
      if (opts.xAxis.scaleType) {
        xAxisScaleType = opts.xAxis.scaleType;
      }
      if (opts.xAxis.type === ChartAxis.AXIS_TYPE.LABEL && opts.xAxis.labels) {
        dataLabels = opts.xAxis.labels;
        if (opts.xAxis.label !== undefined) {
          xAxislabel = this.translate.instant(opts.xAxis.label);
        }
      } else if (opts.xAxis.type === ChartAxis.AXIS_TYPE.NUMERICAL) {
        if (opts.xAxis.label) {
          xAxislabel = this.translate.instant(opts.xAxis.label);
        }
        xAxisTicks = { min: opts.xAxis.minValue, max: opts.xAxis.maxValue };
        if (!opts.xAxis.minValue) {
          xAxisTicks['beginAtZero'] = true;
        }
      }
    }

    let yAxesProperties = [];
    opts.yAxes.forEach((axis) => {
      let yAxisLabel = '';
      let yAxisTicks: object;
      let id: string;
      let position: string;
      let showGrid: boolean = false;
      let offset: boolean = false;
      let grace = axis?.grace ?? '0%';

      if (axis != null) {
        if (axis.offset) {
          offset = axis.offset;
        }
        if (axis.grid) {
          showGrid = axis.grid;
        }
        if (axis.type === ChartAxis.AXIS_TYPE.NUMERICAL) {
          yAxisTicks = { min: axis.minValue, max: axis.maxValue };
        }
        if (axis.label) {
          yAxisLabel = this.translate.instant(axis.label);
        }
        if (axis.location !== undefined) {
          id = axis.location;
        } else {
          id = ChartAxis.AXIS_LOCATION.MAIN;
        }
        position = id === ChartAxis.AXIS_LOCATION.MAIN ? 'left' : 'right';
      }
      yAxesProperties.push({
        type: axis?.scaleType,
        id: id,
        position: position,
        yAxisLabel: yAxisLabel,
        yAxisTicks: yAxisTicks,
        yAxisShowGrid: showGrid,
        yAxisOffset: offset,
        yAxisGrace: grace,
      });
    });

    console.log(dataLabels);

    const config: ChartConfiguration = {
      type: opts.type,
      data: {
        labels: dataLabels,
        datasets: datasets,
      },
      plugins: [ChartDataLabels, Zoom],
      options: {
        animation: {
          duration: 300,
        },
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: opts.indexAxis ?? 'x',
        scales: {
          x: {
            offset: xAxisOffset,
            display: opts.xAxis == null ? false : true,
            grid: {
              color: '#eeeeee',
              display: xAxisShowGrid,
            },
            stacked: opts.stacked,
            title: {
              display: true,
              text: xAxislabel,
            },
            ticks: this.getValue(xAxisTicks, {}),
          },
        },
        plugins: {
          legend: legend,
          tooltip: {
            enabled: opts.tooltip,
            callbacks: {
              label: function (tooltipItem) {
                let label = '';
                if (opts.tooltipTitle) {
                  label = tooltipItem.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                }
                let content = [
                  label +
                    opts.tooltipPrefix +
                    new NumberFormatPipe().transform(<number>tooltipItem.raw) +
                    opts.tooltipSuffix,
                ];
                return content;
              },
            },
            intersect: true,
            backgroundColor: '#ffffffcb',
            bodyColor: '#000000',
            titleColor: '#000000',
            borderColor: '#555555',
            borderWidth: 1,
          },
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
            },
            formatter: (value, ctx) =>
              formatter(value, ctx, opts.tooltipPrefix, opts.tooltipSuffix),
          },
        },
      },
    };

    if (xAxisScaleType) {
      config.options.scales.x['type'] = xAxisScaleType;
    }

    for (let props of yAxesProperties) {
      let yAxis = {
        [props.id]: {
          id: props.id,
          position: props.position,
          display: true,
          offset: props.yAxisOffset,
          grace: props.yAxisGrace,
          grid: {
            color: '#eeeeee',
            display: props.yAxisShowGrid,
          },
          stacked: opts.stacked,
          title: {
            display: true,
            text: props.yAxisLabel,
          },
          ticks: this.getValue(props.yAxisTicks, {
            beginAtZero: true,
          }),
        },
      };
      if (props.type) {
        yAxis[props.id]['type'] = props.type ?? 'linear';
      }
      Object.assign(config.options.scales, yAxis);
    }

    this.chart = new Chart(src, config);
    setTimeout(() => this.chart.update(), 400);
  }

  private getValue(variable, defaultValue) {
    return typeof variable !== 'undefined' ? variable : defaultValue;
  }

  getChart() {
    return this.chart;
  }

  updateChart(newOptions) {
    this.chart.destroy();
    this.options = newOptions;
    this.initChart(this.el.nativeElement, this.options);
    this.chart.update();
  }
}
