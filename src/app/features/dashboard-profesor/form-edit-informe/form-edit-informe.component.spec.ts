import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditInformeComponent } from './form-edit-informe.component';

describe('FormEditInformeComponent', () => {
  let component: FormEditInformeComponent;
  let fixture: ComponentFixture<FormEditInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditInformeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
