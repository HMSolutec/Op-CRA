import { AgentModel } from '../../models/agents/agent.model';

export class AgentDTO implements AgentModel {
  constructor(public name: string, public id: number) {}

  static fromJson(json: AgentModel) {
    return new AgentDTO(json.name, json.id);
  }
}
