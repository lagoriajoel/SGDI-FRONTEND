import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivoUserComponent } from './directivo-user.component';

describe('DirectivoUserComponent', () => {
  let component: DirectivoUserComponent;
  let fixture: ComponentFixture<DirectivoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectivoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectivoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
