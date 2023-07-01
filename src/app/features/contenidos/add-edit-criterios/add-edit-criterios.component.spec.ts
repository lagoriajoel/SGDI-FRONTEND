import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCriteriosComponent } from './add-edit-criterios.component';

describe('AddEditCriteriosComponent', () => {
  let component: AddEditCriteriosComponent;
  let fixture: ComponentFixture<AddEditCriteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCriteriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
