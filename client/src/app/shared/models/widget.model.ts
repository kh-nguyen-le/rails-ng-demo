export interface Widget {
    kind: "widget";
    id: number;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results?: any;
    config?: {
      gradient: boolean;
      autoScale: boolean;
      showXAxis: boolean;
      showYAxis: boolean;
      showXAxisLabel: boolean;
      showYAxisLabel: boolean;
      showLegend: boolean;
      xAxisLabel: string;
      yAxisLabel: string;
      widgetType: string;
      legendPosition: string;
    };
  }