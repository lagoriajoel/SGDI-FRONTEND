import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeProfesorComponent } from './dashboard-home-profesor.component';

describe('DashboardHomeProfesorComponent', () => {
  let component: DashboardHomeProfesorComponent;
  let fixture: ComponentFixture<DashboardHomeProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHomeProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHomeProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
