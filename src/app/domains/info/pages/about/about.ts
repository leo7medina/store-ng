import { Component, signal } from '@angular/core';
import { Counter } from '@shared/components/counter/counter';
import { WaveAudio } from '@info/components/wave-audio/wave-audio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about',
  imports: [CommonModule, Counter, WaveAudio, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  duration = signal(1000);
  message = signal('Hola');

  obsWithInit$ = new BehaviorSubject<string>('init value');
  $withInit = toSignal(this.obsWithInit$, {
    requireSync: true,
  });

  obsWithoutInit$ = new Subject<string>();
  $withoutInit = toSignal(this.obsWithoutInit$, {
    initialValue: 'initial value ---------',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }


  emitWithInit() {
    this.obsWithInit$.next('new value');
  }

  emitWithoutInit() {
    this.obsWithoutInit$.next('new value ********');
  }

}
