import { GridWidget } from "./gridwidget.model";
import { Layout } from "./layout.model";
import { LayoutGrid } from "./layoutgrid.model";
import { Widget } from "./widget.model";

export interface Grid {
    id: number;
    name: string;
    title: string;
    col: number;
    size: string;
    widgets: Widget[];
    layouts: Layout[];
    layout_grids: LayoutGrid[];
    grid_widgets: GridWidget[];
  }