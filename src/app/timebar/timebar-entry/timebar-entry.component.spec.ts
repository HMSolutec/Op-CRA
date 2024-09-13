import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimebarEntryComponent } from './timebar-entry.component';
import moment from 'moment';
import { By } from '@angular/platform-browser';

describe('TimebarEntryComponent', () => {
  let component: TimebarEntryComponent;
  let fixture: ComponentFixture<TimebarEntryComponent>;
  const start = moment().set("hour", 1).set("minutes", 29)
  const end = moment().set("hour", 3).set("minutes", 13);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimebarEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimebarEntryComponent);
    fixture.componentRef.setInput("start", start);
    fixture.componentRef.setInput("end", end);
    fixture.componentRef.setInput("bg-color", "#FF0000");
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct timestamps on hover', () => {
    const tooltips = fixture.debugElement.queryAll(By.css(".entry>div"));
    expect(tooltips.at(0)?.nativeElement?.textContent).toEqual(" 01:29 ");
    expect(tooltips.at(1)?.nativeElement?.textContent).toEqual(" 03:13 ");
  })
});
