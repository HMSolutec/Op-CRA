import { MissionModel } from '../../models/missions/mission.model';

export class MissionDTO implements MissionModel {
  constructor(public id: number, public title: string, public color: string) {}

  static fromJson(json: MissionModel) {
    return new MissionDTO(json.id, json.title, json.color);
  }
}
