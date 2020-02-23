import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { WidgetComponent } from '../widget/widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  const grid = {
    id: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        GridComponent,
        WidgetComponent 
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatGridListModule,
        NgxChartsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.debugElement.componentInstance;
    component.grid = grid;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
