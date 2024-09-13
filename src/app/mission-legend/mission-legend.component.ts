import {
  Component,
  forwardRef,
  input,
  model,
  signal
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-mission-legend',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mission-legend.component.html',
  styleUrl: './mission-legend.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MissionLegendComponent),
      multi: true,
    },
  ],
})
export class MissionLegendComponent implements ControlValueAccessor {
  value = model.required<number>();
  title = input.required<string>();
  interactive = input(false);
  id = input<string>();
  color = input<string>();
  name = input<string>();
  selectedValue = signal(1);

  onTouched: Function = () => {};
  onChange: Function = () => {};

  onValueChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.selectedValue.set(Number(inputValue));
    this.onChange(inputValue);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.selectedValue.set(value);
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
