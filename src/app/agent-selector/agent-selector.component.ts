import { Component, effect, inject } from '@angular/core';
import { AgentStore } from '../../stores/agent.store';
import { UIStore } from '../../stores/ui.store';

@Component({
  selector: 'app-agent-selector',
  standalone: true,
  imports: [],
  templateUrl: './agent-selector.component.html',
  styleUrl: './agent-selector.component.css'
})
export class AgentSelectorComponent {
  readonly agentStore = inject(AgentStore);
  readonly uiStore = inject(UIStore);

  constructor() {
    effect(() => {
      if (!this.agentStore.isLoading()) {
        this.uiStore.selectAgent(this.agentStore.agents()[0]);
      }
    }, {allowSignalWrites: true})
  }

  onAgentSelect(e: Event) {
    if (e.target instanceof HTMLSelectElement) {
      const target = e.target;
      const agent = this.agentStore
        .agents()
        .find(({ id }) => id === Number(target.value));
      if (agent) {
        this.uiStore.selectAgent(agent);
      }
    }
  }
}
