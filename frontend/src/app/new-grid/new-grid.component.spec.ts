import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGridComponent } from './new-grid.component';

describe('NewGridComponent', () => {
  let component: NewGridComponent;
  let fixture: ComponentFixture<NewGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
