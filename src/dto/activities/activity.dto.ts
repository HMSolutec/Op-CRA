import moment, { Moment } from 'moment-timezone';
import { MissionDTO } from '../missions/mission.dto';
import { ActivityModel } from '../../models/activities/activity.model';

export class ActivityDTO implements Omit<ActivityModel, "start" | "end"> {
  constructor(
    public start: Moment,
    public end: Moment,
    public mission: MissionDTO,
    public id: number,
    public agentId: number,
    public leaveDay?: boolean,
  ) {}

  static fromJson(json: ActivityModel) {
    return new ActivityDTO(
      moment.unix(json.start),
      moment.unix(json.end),
      MissionDTO.fromJson(json.mission),
      json.id,
      json.agentId
    );
  }
}
