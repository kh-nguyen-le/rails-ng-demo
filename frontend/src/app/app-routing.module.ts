import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash/dash.component';
import { EditorWidgetComponent } from './editor-widget/editor-widget.component';
import { EditorGridComponent } from './editor-grid/editor-grid.component';
import { EditorLayoutComponent } from './editor-layout/editor-layout.component';

const appRoutes: Routes = [
  { path: 'dash/:id', component: DashComponent },
  { path: 'widgets', component: EditorWidgetComponent },
  { path: 'grids', component: EditorGridComponent },
  { path: 'layouts', component: EditorLayoutComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
