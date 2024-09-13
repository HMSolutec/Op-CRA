import {
  Component,
  computed,
  effect,
  EventEmitter,
  HostListener,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { asPercentage } from '../../../utils/maths';
import { Moment } from 'moment';

@Component({
  selector: 'app-timebar-entry',
  standalone: true,
  imports: [],
  templateUrl: './timebar-entry.component.html',
  styleUrl: './timebar-entry.component.css',
})
export class TimebarEntryComponent {
  start = input.required<Moment>();
  end = input.required<Moment>();
  bgColor = input.required<string>({ alias: 'bg-color' });

  rightValue = computed(() => this.computeRight());
  leftValue = computed(() => this.computeLeft());
  transparentBgColor = computed(() => this.bgColor() + '55');
  startFormatted = computed(() => this.start().format('HH:mm'));
  endFormatted = computed(() => this.end().format('HH:mm'));

  computeRight() {
    const minutes = this.end().get('m') + this.end().get('h') * 60;

    return `${100 - asPercentage(minutes, 24 * 60)}%`;
  }

  computeLeft() {
    const minutes = this.start().get('m') + this.start().get('h') * 60;

    return `${asPercentage(minutes, 24 * 60)}%`;
  }
}
