import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarInformeMesaComponent } from './mostrar-informe-mesa.component';

describe('MostrarInformeMesaComponent', () => {
  let component: MostrarInformeMesaComponent;
  let fixture: ComponentFixture<MostrarInformeMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarInformeMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarInformeMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
