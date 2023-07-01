import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInformesMateriasComponent } from './listar-informes-materias.component';

describe('ListarInformesMateriasComponent', () => {
  let component: ListarInformesMateriasComponent;
  let fixture: ComponentFixture<ListarInformesMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInformesMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarInformesMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
