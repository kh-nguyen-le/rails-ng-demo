import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWidgetComponent } from './new-widget.component';

describe('NewWidgetComponent', () => {
  let component: NewWidgetComponent;
  let fixture: ComponentFixture<NewWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
