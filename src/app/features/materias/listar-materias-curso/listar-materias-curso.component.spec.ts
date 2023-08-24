import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMateriasCursoComponent } from './listar-materias-curso.component';

describe('ListarMateriasCursoComponent', () => {
  let component: ListarMateriasCursoComponent;
  let fixture: ComponentFixture<ListarMateriasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMateriasCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMateriasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
