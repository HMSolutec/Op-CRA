import { AxiosResponse } from 'axios';
import api from '../..';
import { AgentDTO } from '../../../dto/agents/agent.dto';

const mockAgents: AgentDTO[] = [
  new AgentDTO('Dujardin', 1),
  new AgentDTO('Bond', 2),
  new AgentDTO('Cruise', 3),
];

export abstract class AgentMockEndpoint {
  static async getAgents(): Promise<AxiosResponse<AgentDTO[]>> {
    const res = await api.get('/users');

    res.data = mockAgents;

    return res;
  }
}
