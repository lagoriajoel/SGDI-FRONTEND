import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMateriasComponent } from './dashboard-materias.component';

describe('DashboardMateriasComponent', () => {
  let component: DashboardMateriasComponent;
  let fixture: ComponentFixture<DashboardMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMateriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
