import { Action, createReducer, on } from '@ngrx/store';
import { LayoutGrid } from '../../models/layoutgrid.model';
import { CreateActions } from '../editor-state';
import * as fromActions from './layout.actions';
import { initialState, adapter } from './layout.selectors';
import * as fromState from './layout.state';

const layoutReducer = createReducer(
  initialState,
  on(fromActions.loadLayoutsSuccess, (state, { layouts }) => {
    return adapter.setAll(layouts, { ...state });
  }),
  on(fromActions.deleteLayoutSuccess, (state, { id }) => {
    return adapter.removeOne(id, { ...state, selectedLayoutId: null });
  }),
  on(CreateActions.createLayoutSuccess, (state, { layout }) => {
    return adapter.addOne(layout, { ...state, selectedLayoutId: null });
  }),
  on(fromActions.selectLayout, (state, { id }) => {
    return { ...state, selectedLayoutId: id };
  }),
  on(fromActions.fetchLayoutSuccess, (state, { layout }) => {
    return adapter.upsertOne(layout, { ...state, selectedLayoutId: layout.id });
  }),
  on(fromActions.updateLayoutSuccess, (state, { update }) => {
    return adapter.updateOne(update, { ...state, selectedLayoutId: update.id });
  }),
  on(CreateActions.createLayoutGridSuccess, (state, { layoutgrid }) => {
    const id = layoutgrid.layout_id;
    const layout = state.entities[id];
    const lgs: LayoutGrid[] = layout.layout_grids;
    const newLGs: LayoutGrid[] = [...lgs];
    newLGs.push(layoutgrid);
    const newLayout = { ...layout, layout_grids: newLGs };

    return adapter.upsertOne(newLayout, { ...state, selectedLayoutId: id });
  }),
  on(CreateActions.deleteLayoutGridSuccess, (state, { layoutgrid }) => {
    const id = layoutgrid.layout_id;
    const layout = state.entities[id];
    const lgs: LayoutGrid[] = layout.layout_grids;
    const newLGs: LayoutGrid[] = [...lgs].filter(
      (lg: LayoutGrid) => lg.id !== layoutgrid.id
    );
    const newLayout = { ...layout, layout_grids: newLGs };

    return adapter.upsertOne(newLayout, {
      ...state,
      selectedLayoutId: layoutgrid.layout_id,
    });
  }),
  on(CreateActions.updateLayoutGridSuccess, (state, { layoutgrid }) => {
    const id = layoutgrid.layout_id;
    const layout = state.entities[id];
    const lgs: LayoutGrid[] = layout.layout_grids;
    const newLGs: LayoutGrid[] = [...lgs].filter(
      (lg: LayoutGrid) => lg.id != layoutgrid.id
    );
    newLGs.push(layoutgrid);
    const newLayout = { ...layout, layout_grids: newLGs };

    return adapter.upsertOne(newLayout, { ...state, selectedLayoutId: id });
  })
);

export function reducer(
  state: fromState.State | undefined,
  action: Action
): fromState.State {
  return layoutReducer(state, action);
}
