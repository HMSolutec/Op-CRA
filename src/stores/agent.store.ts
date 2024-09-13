import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState
} from '@ngrx/signals';
import { AgentMockEndpoint } from '../api/endpoints/agent/agent.mock.endpoint';
import { AgentDTO } from '../dto/agents/agent.dto';
import { UIStore } from './ui.store';

type AgentState = {
  agents: AgentDTO[];
  isLoading: boolean;
  error: Error | null;
  test: number;
};

const initialState: AgentState = {
  agents: [],
  isLoading: true,
  error: null,
  test: 0
};

export const AgentStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, uiStore = inject(UIStore)) => ({
    async load(): Promise<void> {
      patchState(store, { isLoading: true });

      try {
        const res = await AgentMockEndpoint.getAgents();

        patchState(store, {
          isLoading: false,
          agents: res.data,
        });

        if (res.data.length > 0) {
          uiStore.selectAgent(res.data[0]);
        }
      } catch (e) {
        patchState(store, {
          isLoading: false,
          error: e as Error,
        });
      }
    },
  }))
);
