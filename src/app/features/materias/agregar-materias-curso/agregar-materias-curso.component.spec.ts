import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMateriasCursoComponent } from './agregar-materias-curso.component';

describe('AgregarMateriasCursoComponent', () => {
  let component: AgregarMateriasCursoComponent;
  let fixture: ComponentFixture<AgregarMateriasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMateriasCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMateriasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
