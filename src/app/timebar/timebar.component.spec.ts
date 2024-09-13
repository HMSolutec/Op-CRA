import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimebarComponent } from './timebar.component';
import moment from 'moment';
import { ActivityCollectionDTO } from '../../dto/activities/activity-collection.dto';

describe('TimebarComponent', () => {
  let component: TimebarComponent;
  let fixture: ComponentFixture<TimebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("activity-collection", new ActivityCollectionDTO(moment("2024-09-10T00:00:00.000Z"), []));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
