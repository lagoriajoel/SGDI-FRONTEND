import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCursoComponent } from './add-edit-curso.component';

describe('AddEditCursoComponent', () => {
  let component: AddEditCursoComponent;
  let fixture: ComponentFixture<AddEditCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
