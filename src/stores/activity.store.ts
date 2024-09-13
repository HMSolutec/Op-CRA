import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Moment } from 'moment-timezone';
import { ActivityMockEndpoint } from '../api/endpoints/activity/activity.mock.endpoint';
import { inject } from '@angular/core';
import { UIStore } from './ui.store';
import { ActivityDTO } from '../dto/activities/activity.dto';
import { MissionDTO } from '../dto/missions/mission.dto';
import moment from 'moment';

type ActivityState = {
  activities: { [agentId: string]: ActivityDTO[][] };
  isLoading: boolean;
  error: Error | null;
};

const initialState: ActivityState = {
  activities: {},
  isLoading: true,
  error: null,
};

export const ActivityStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store) => ({
    async load(agentId: number, from: Moment, to: Moment) {
      patchState(store, (state) => ({ ...state, isLoading: true }));

      try {
        const res = await ActivityMockEndpoint.getActivities(agentId, from, to);
        patchState(store, (state) => ({
          ...state,
          activities: { ...state.activities, [agentId]: res.data },
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
    async editActivity(
      agentId: number,
      activityId: number,
      from: string,
      to: string,
      missionId: number
    ) {
      patchState(store, (state) => ({ ...state, isLoading: true }));

      try {
        const res = await ActivityMockEndpoint.editActivity(
          activityId,
          from,
          to,
          missionId
        );

        patchState(store, (state) => ({
          ...state,
          activities: { ...state.activities, [agentId]: res.data },
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
    async addActivity(
      agentId: number,
      date: string,
      from: string,
      to: string,
      missionId: number
    ) {
      patchState(store, (state) => ({ ...state, isLoading: true }));

      try {
        const res = await ActivityMockEndpoint.addActivity(
          agentId,
          missionId,
          moment(date).unix(),
          from,
          to
        );

        patchState(store, (state) => ({
          ...state,
          activities: { ...state.activities, [agentId]: res.data },
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
