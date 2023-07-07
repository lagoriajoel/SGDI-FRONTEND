import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarIInformeFebreroComponent } from './mostrar-i-informe-febrero.component';

describe('MostrarIInformeFebreroComponent', () => {
  let component: MostrarIInformeFebreroComponent;
  let fixture: ComponentFixture<MostrarIInformeFebreroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarIInformeFebreroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarIInformeFebreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
