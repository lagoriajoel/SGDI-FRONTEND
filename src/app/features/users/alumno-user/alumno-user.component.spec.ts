import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoUserComponent } from './alumno-user.component';

describe('AlumnoUserComponent', () => {
  let component: AlumnoUserComponent;
  let fixture: ComponentFixture<AlumnoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
