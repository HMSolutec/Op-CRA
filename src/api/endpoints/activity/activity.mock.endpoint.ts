import moment, { Moment } from 'moment';
import { AxiosResponse } from 'axios';
import api from '../..';
import { ActivityDTO } from '../../../dto/activities/activity.dto';
import { MissionDTO } from '../../../dto/missions/mission.dto';

const activityCollectionsMock: ActivityDTO[][] = (Array(31) as ActivityDTO[])
  .fill({
    start: moment(),
    end: moment(),
    mission: new MissionDTO(0, '', ''),
    agentId: 0,
    id: 0,
  })
  .map((_, i) => [
    new ActivityDTO(
      moment().add(i, 'day').hours(8).minutes(0),
      moment().add(i, 'day').hours(9).minutes(0),
      { color: '#FF0000', id: 1, title: 'Infiltrer le KGB' },
      i * 3,
      1,
    ),
    new ActivityDTO(
      moment().add(i, 'day').hours(10).minutes(0),
      moment().add(i, 'day').hours(12).minutes(0),
      { color: '#0000FF', id: 2, title: 'Saboter des centrales nucléaires' },
      i * 3 + 1,
      1
    ),
    new ActivityDTO(
      moment().add(i, 'day').hours(15).minutes(0),
      moment().add(i, 'day').hours(20).minutes(0),
      { color: '#00FF00', id: 3, title: 'Course poursuite' },
      i * 3 + 2,
      1
    ),
  ]);

export abstract class ActivityMockEndpoint {
  static async getActivities(
    agentId: number,
    from: Moment,
    to: Moment
  ): Promise<AxiosResponse<ActivityDTO[][]>> {
    const res = await api.get('/posts');

    res.data = activityCollectionsMock.filter(
      (activityCollection) =>
        activityCollection.at(0)?.agentId === agentId &&
        activityCollection.at(0)?.start.isSameOrAfter(from) &&
        activityCollection.at(0)?.start.isSameOrBefore(to)
    );

    return res;
  }

  static async addActivity(
    agentId: number,
    missionId: number,
    date: number,
    from: string,
    to: string
  ) {
    const res = await api.get('/posts');

    res.data = activityCollectionsMock;

    return res;
  }

  static async editActivity(
    activityId: number,
    from: string,
    to: string,
    missionId: number
  ) {
    const res = await api.get('/posts');

    res.data = activityCollectionsMock;

    return res;
  }
}
