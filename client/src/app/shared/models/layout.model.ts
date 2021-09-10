import { Grid } from "./grid.model";
import { LayoutGrid } from "./layoutgrid.model";

export interface Layout {
    kind: "layout";
    id: number;
    name: string;
    background?: string;
    duration?: number;
    grids?: Grid[];
    layout_grids?: LayoutGrid[];
  }