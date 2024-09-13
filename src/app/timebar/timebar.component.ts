import { Component, inject, input, signal } from '@angular/core';
import { ActivityDTO } from '../../dto/activities/activity.dto';
import { UIStore } from '../../stores/ui.store';
import { TimebarEntryComponent } from './timebar-entry/timebar-entry.component';

@Component({
  selector: 'app-timebar',
  standalone: true,
  imports: [TimebarEntryComponent],
  templateUrl: './timebar.component.html',
  styleUrl: './timebar.component.css',
})
export class TimebarComponent {
  readonly uiStore = inject(UIStore);

  activities = input.required<ActivityDTO[]>({ alias: 'activities' });
  tooltipPosition = signal(100);
  timestampTooltip = signal('');

  isLeaveDay() {
    return this.activities().some((a) => a.leaveDay);
  }

  onClickEntry(e: Event, activity: ActivityDTO) {
    e.stopPropagation();

    this.uiStore.openModal(activity);
  }
}
