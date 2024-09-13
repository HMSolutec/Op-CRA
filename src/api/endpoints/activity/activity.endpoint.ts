import { AxiosResponse } from 'axios';
import { ActivityDTO } from '../../../dto/activities/activity.dto';
import { Moment } from 'moment';

export abstract class ActivityEndpoint {
  static async getActivities(agentId: number, from: Moment, to: Moment) {}

  static async addActivity(
    agentId: number,
    missionId: number,
    date: number,
    from: string,
    to: string
  ) {}

  static async editActivity(
    activityId: number,
    from: string,
    to: string,
    missionId: number
  ) {}
}
