import { ChartAxis } from './axis.model';

/**
 * Chart Serie definition
 */
export class ChartSerie {
  public static readonly AXIS_LOCATION = ChartAxis.AXIS_LOCATION;
  name?: string;
  data: any;
  color?: string;
  subtype?: string;
  axisLocation?: string;
  label?: string;
  showDataLabel?: boolean = false;
  tooltipPrefix?: string;
  tooltipSuffix?: string;
}
