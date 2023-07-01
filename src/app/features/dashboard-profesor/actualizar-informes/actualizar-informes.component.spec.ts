import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarInformesComponent } from './actualizar-informes.component';

describe('ActualizarInformesComponent', () => {
  let component: ActualizarInformesComponent;
  let fixture: ComponentFixture<ActualizarInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarInformesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
