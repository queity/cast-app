import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDialogCategoriaComponent } from './view-dialog-categoria.component';

describe('ViewDialogCategoriaComponent', () => {
  let component: ViewDialogCategoriaComponent;
  let fixture: ComponentFixture<ViewDialogCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDialogCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
