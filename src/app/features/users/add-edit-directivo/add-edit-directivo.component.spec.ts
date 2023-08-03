import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDirectivoComponent } from './add-edit-directivo.component';

describe('AddEditDirectivoComponent', () => {
  let component: AddEditDirectivoComponent;
  let fixture: ComponentFixture<AddEditDirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDirectivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
