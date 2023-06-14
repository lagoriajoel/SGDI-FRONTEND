import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorUserComponent } from './profesor-user.component';

describe('ProfesorUserComponent', () => {
  let component: ProfesorUserComponent;
  let fixture: ComponentFixture<ProfesorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
