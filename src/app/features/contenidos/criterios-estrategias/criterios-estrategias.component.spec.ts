import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosEstrategiasComponent } from './criterios-estrategias.component';

describe('CriteriosEstrategiasComponent', () => {
  let component: CriteriosEstrategiasComponent;
  let fixture: ComponentFixture<CriteriosEstrategiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriosEstrategiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriosEstrategiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
