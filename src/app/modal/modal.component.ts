import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';
import { ActivityStore } from '../../stores/activity.store';
import { MissionStore } from '../../stores/mission.store';
import { UIStore } from '../../stores/ui.store';
import { MissionLegendComponent } from '../mission-legend/mission-legend.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MissionLegendComponent, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  readonly uiStore = inject(UIStore);
  readonly missionStore = inject(MissionStore);
  readonly activityStore = inject(ActivityStore);

  formGroup = computed(
    () =>
      new FormGroup({
        from: new FormControl(
          this.uiStore.selectedActivity()?.start?.format('hh:mm') ?? '00:00'
        ),
        to: new FormControl(
          this.uiStore.selectedActivity()?.end?.format('hh:mm') ?? '10:00'
        ),
        date: new FormControl(
          this.uiStore.selectedActivity()?.start?.format('YYYY-MM-DD') ??
            moment().format('YYYY-MM-DD')
        ),
        mission: new FormControl(
          this.uiStore.selectedActivity()?.mission?.id ??
            this.missionStore.missions()[0].id
        ),
      })
  );

  async onSave(e: SubmitEvent) {
    const selectedMission = this.missionStore
      .missions()
      .find((m) => m.id === this.formGroup().value.mission);

    e.preventDefault();
    if (this.uiStore.selectedActivity()) {
      await this.activityStore.editActivity(
        this.uiStore.selectedActivity()!.agentId,
        this.uiStore.selectedActivity()!.id,
        this.formGroup().value.from!,
        this.formGroup().value.to!,
        selectedMission!.id
      );
    } else {
      await this.activityStore.addActivity(
        this.uiStore.selectedAgent()!.id,
        this.formGroup().value.date!,
        this.formGroup().value.from!,
        this.formGroup().value.to!,
        selectedMission!.id
      );
    }

    this.uiStore.closeModal();
  }

  onChange(e: Event) {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const [hours, minutes] = target.value.split(':').map((v) => Number(v));

      moment().hours(hours).minutes(minutes).unix();
    }
  }

  onOutsideClick(e: Event) {
    this.uiStore.closeModal();
  }
}
