import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisContenidosComponent } from './mis-contenidos.component';

describe('MisContenidosComponent', () => {
  let component: MisContenidosComponent;
  let fixture: ComponentFixture<MisContenidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisContenidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisContenidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
