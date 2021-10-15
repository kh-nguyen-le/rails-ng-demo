import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashComponent } from './display/dash/dash.component';
import { EditorWidgetComponent } from './editor/editor-widget/editor-widget.component';
import { EditorGridComponent } from './editor/editor-grid/editor-grid.component';
import { EditorLayoutComponent } from './editor/editor-layout/editor-layout.component';
import { NewWidgetComponent } from './editor/new-widget/new-widget.component';
import { EditWidgetComponent } from './editor/edit-widget/edit-widget.component';
import { NewGridComponent } from './editor/new-grid/new-grid.component';
import { EditGridComponent } from './editor/edit-grid/edit-grid.component';
import { NewLayoutComponent } from './editor/new-layout/new-layout.component';
import { EditLayoutComponent } from './editor/edit-layout/edit-layout.component';

const appRoutes: Routes = [
  { path: 'dash/:id', component: DashComponent },
  { path: 'widgets', component: EditorWidgetComponent, outlet: 'drawer' },
  { path: 'new_widget', component: NewWidgetComponent, outlet: 'drawer' },
  {
    path: 'widgets/:id',
    component: EditWidgetComponent,
    runGuardsAndResolvers: 'always',
    outlet: 'drawer',
  },
  { path: 'grids', component: EditorGridComponent, outlet: 'drawer' },
  { path: 'new_grid', component: NewGridComponent, outlet: 'drawer' },
  {
    path: 'grids/:id',
    component: EditGridComponent,
    runGuardsAndResolvers: 'always',
    outlet: 'drawer',
  },
  { path: 'layouts', component: EditorLayoutComponent, outlet: 'drawer' },
  { path: 'new_layout', component: NewLayoutComponent, outlet: 'drawer' },
  {
    path: 'layouts/:id',
    component: EditLayoutComponent,
    runGuardsAndResolvers: 'always',
    outlet: 'drawer',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
