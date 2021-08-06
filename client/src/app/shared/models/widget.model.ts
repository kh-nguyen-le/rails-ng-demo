export interface Widget {
    id: number;
    name: string;
    results: unknown;
    config: {
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