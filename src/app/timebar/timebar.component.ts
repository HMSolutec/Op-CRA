import { Component, Input } from '@angular/core';

type Mission = {
  id: number;
  title: string;
  color: string;
};

type Activity = {
  start: Date;
  end: Date;
  mission: Mission;
};

export type ActivityCollection = {
  date: Date;
  activities: Activity[];
  leaveDay?: boolean;
};

@Component({
  selector: 'app-timebar',
  standalone: true,
  imports: [],
  templateUrl: './timebar.component.html',
  styleUrl: './timebar.component.css',
})
export class TimebarComponent {
  @Input({ required: true }) activityCollection!: ActivityCollection;

  getWidth(a: Activity) {
    return `${Math.floor(
      ((a.end.getTime() - a.start.getTime()) * 100) / (24 * 3600000)
    )}%`;
  }

  getLeft(a: Activity) {
    return `${
      (a.start.getTime() * 100) /
      (this.activityCollection.date.getTime() + 24 * 3600000)
    }%`;
  }

  getRight(a: Activity) {
    return `${
      100 -
      (a.end.getTime() * 100) /
        (this.activityCollection.date.getTime() + 24 * 3600000)
    }%`;
  }
}
