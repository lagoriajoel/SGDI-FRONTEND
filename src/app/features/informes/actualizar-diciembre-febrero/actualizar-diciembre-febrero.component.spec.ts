import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDiciembreFebreroComponent } from './actualizar-diciembre-febrero.component';

describe('ActualizarDiciembreFebreroComponent', () => {
  let component: ActualizarDiciembreFebreroComponent;
  let fixture: ComponentFixture<ActualizarDiciembreFebreroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarDiciembreFebreroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarDiciembreFebreroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
