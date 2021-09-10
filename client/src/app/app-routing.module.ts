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
  { path: 'widgets', component: EditorWidgetComponent },
  { path: 'widgets/new', component: NewWidgetComponent },
  {
    path: 'widgets/:id',
    component: EditWidgetComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'grids', component: EditorGridComponent },
  { path: 'grids/new', component: NewGridComponent },
  {
    path: 'grids/:id',
    component: EditGridComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'layouts', component: EditorLayoutComponent },
  { path: 'layouts/new', component: NewLayoutComponent },
  {
    path: 'layouts/:id',
    component: EditLayoutComponent,
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
