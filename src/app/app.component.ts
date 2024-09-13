import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import moment, { Moment } from 'moment';
import { ActivityStore } from '../stores/activity.store';
import { AgentStore } from '../stores/agent.store';
import { MissionStore } from '../stores/mission.store';
import { UIStore } from '../stores/ui.store';
import { AgentSelectorComponent } from './agent-selector/agent-selector.component';
import { MissionLegendComponent } from './mission-legend/mission-legend.component';
import { ModalComponent } from './modal/modal.component';
import { TimebarComponent } from './timebar/timebar.component';
import { getInputEventValue } from '../utils/events';
import { ActivityDTO } from '../dto/activities/activity.dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TimebarComponent,
    MissionLegendComponent,
    ModalComponent,
    AgentSelectorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly uiStore = inject(UIStore);
  readonly agentStore = inject(AgentStore);
  readonly missionStore = inject(MissionStore);
  readonly activityStore = inject(ActivityStore);

  dates = computed(() =>
    new Array(this.uiStore.to().diff(this.uiStore.from(), 'days'))
      .fill(0)
      .map((_, i) => {
        return this.uiStore.from().clone().add(i, 'days');
      })
  );

  constructor() {
    effect(
      () => {
        this.agentStore.load();
        this.missionStore.load();
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        if (this.uiStore.selectedAgent()) {
          this.activityStore.load(
            this.uiStore.selectedAgent()!.id,
            this.uiStore.from(),
            this.uiStore.to()
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  getActivityCollectionFromMoment(date: Moment) {
    return this.activityStore
      .activities()
      [this.uiStore.selectedAgent()!.id].find((c) =>
        c.some(
          (a) => a.start.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        )
      ) ?? [];
  }

  onFromChange(e: Event) {
    this.uiStore.updateFrom(moment(getInputEventValue(e)));
  }

  onToChange(e: Event) {
    this.uiStore.updateTo(moment(getInputEventValue(e)));
  }
}
