/**
 * Chart Axis definition
 */
export class ChartAxis {
  public static readonly DATE_INTERVALS = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  };
  public static readonly AXIS_TYPE = {
    LABEL: 'label',
    NUMERICAL: 'numerical',
    DATE: 'date',
    NONE: 'none',
  };
  public static readonly WEEKDAY = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 6,
    SATURDAY: 6,
  };
  public static readonly AXIS_LOCATION = {
    MAIN: 'y',
    SECONDARY: 'y1',
  };
  public static readonly FORMAT = {
    NONE: 0,
    EXACT: 1,
    INFORMAL: 2,
  };
  /**
   * values in AXIS_TYPE
   */
  type: string;
  scaleType?: string;
  name: string;
  label?: string;
  labels?: string[];
  /**
   * values in AXIS_LOCATION
   */
  location: string;
  /**
   * values in DATE_INTERVALS
   */
  dateInterval?: string;
  /**
   * values in WEEKDAY
   */
  weekStartDay?: number;
  minValue?: any;
  maxValue?: any;
  showTicks?: boolean;
  format?: number;
  offset?: boolean;
  grace?: string;
  grid?: boolean;
  fixedWidth?: number;
}
