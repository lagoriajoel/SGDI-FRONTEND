import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumnoCursoComponent } from './add-alumno-curso.component';

describe('AddAlumnoCursoComponent', () => {
  let component: AddAlumnoCursoComponent;
  let fixture: ComponentFixture<AddAlumnoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlumnoCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlumnoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
