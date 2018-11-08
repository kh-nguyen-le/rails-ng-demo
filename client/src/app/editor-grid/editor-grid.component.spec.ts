import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGridComponent } from './editor-grid.component';

describe('EditorGridComponent', () => {
  let component: EditorGridComponent;
  let fixture: ComponentFixture<EditorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
