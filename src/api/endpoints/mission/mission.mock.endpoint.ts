import { AxiosResponse } from 'axios';
import api from '../..';
import { MissionModel } from '../../../models/missions/mission.model';
import { MissionDTO } from '../../../dto/missions/mission.dto';

const mockMissions: MissionModel[] = [
  { color: '#FF0000', id: 1, title: 'Infiltrer le KGB' },
  { color: '#0000FF', id: 2, title: 'Saboter des centrales nucléaires' },
  { color: '#00FF00', id: 3, title: 'Course poursuite' },
];

export abstract class MissionMockEndpoint {
  static async getMissions(): Promise<AxiosResponse<MissionDTO[]>> {
    const res = await api.get('/todos');

    res.data = mockMissions;

    return res;
  }
}
