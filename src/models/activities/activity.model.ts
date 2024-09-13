import { Moment } from 'moment';
import { MissionModel } from '../missions/mission.model';

export interface ActivityModel {
  start: number;
  end: number;
  mission: MissionModel;
  id: number;
  agentId: number;
};
