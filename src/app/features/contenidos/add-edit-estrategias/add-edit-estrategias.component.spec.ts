import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEstrategiasComponent } from './add-edit-estrategias.component';

describe('AddEditEstrategiasComponent', () => {
  let component: AddEditEstrategiasComponent;
  let fixture: ComponentFixture<AddEditEstrategiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEstrategiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEstrategiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
