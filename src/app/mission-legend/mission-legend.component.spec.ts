import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionLegendComponent } from './mission-legend.component';

describe('MissionLegendComponent', () => {
  let component: MissionLegendComponent;
  let fixture: ComponentFixture<MissionLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionLegendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
