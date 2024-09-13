import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ActivityDTO } from '../dto/activities/activity.dto';
import { AgentDTO } from '../dto/agents/agent.dto';
import { Moment } from 'moment-timezone';
import moment from 'moment';
import { computed } from '@angular/core';

type UIState = {
  modalOpen: boolean;
  selectedActivity: ActivityDTO | null;
  selectedAgent: AgentDTO | null;
  from: Moment;
  to: Moment;
};

const initialState: UIState = {
  modalOpen: false,
  selectedActivity: null,
  selectedAgent: null,
  from: moment(),
  to: moment().date(moment().daysInMonth()),
};

export const UIStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ to, from }) => ({
    toAsInputString: computed(() => to().format('YYYY-MM-DD')),
    fromAsInputString: computed(() => from().format('YYYY-MM-DD')),
  })),
  withMethods((store) => ({
    openModal(activity?: ActivityDTO) {
      patchState(store, (state) => ({
        ...state,
        modalOpen: true,
        selectedActivity: activity,
      }));
    },
    closeModal() {
      patchState(store, (state) => ({
        ...state,
        modalOpen: false,
        selectedActivity: undefined,
      }));
    },
    selectAgent(agent: AgentDTO) {
      patchState(store, (state) => ({ ...state, selectedAgent: agent }));
    },
    updateFrom(date: Moment) {
      patchState(store, (state) => ({ ...state, from: date }));
    },
    updateTo(date: Moment) {
      patchState(store, (state) => ({ ...state, to: date }));
    },
  }))
);
