import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProfesoresComponent } from './add-edit-profesores.component';

describe('AddEditProfesoresComponent', () => {
  let component: AddEditProfesoresComponent;
  let fixture: ComponentFixture<AddEditProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProfesoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
