import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { MissionMockEndpoint } from '../api/endpoints/mission/mission.mock.endpoint';
import { MissionDTO } from '../dto/missions/mission.dto';

type MissionState = {
  missions: MissionDTO[];
  isLoading: boolean;
  error: Error | null;
};

const initialState: MissionState = {
  missions: [],
  isLoading: true,
  error: null,
};

export const MissionStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store) => ({
    async load() {
      patchState(store, (state) => ({ ...state, isLoading: true }));

      try {
        const res = await MissionMockEndpoint.getMissions();
        patchState(store, (state) => ({
          ...state,
          missions: res.data,
          isLoading: false,
        }));
      } catch (error) {
        patchState(store, (state) => ({
          ...state,
          error: state.error,
          isLoading: false,
        }));
      }
    },
  }))
);
