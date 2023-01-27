import { InformalNumberTruncatePipe } from '../../pipes/informal-num.pipe';

export function formatter(value, ctx, prefix, suffix) {
  function getTextWidth(text) {
    // re-use canvas object for better performance
    let canvas = ctx.chart.canvas;
    let context = canvas.getContext('2d');
    let metrics = context.measureText(text);
    return metrics.width;
  }
  let formattedVal = new InformalNumberTruncatePipe().transform(value);
  let model = ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.dataIndex];
  if (getTextWidth(prefix + formattedVal + suffix) > model.x - model['base']) {
    return '';
  }
  return prefix + formattedVal + suffix;
}
