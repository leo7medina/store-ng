import {Component, signal} from '@angular/core';
import {Counter} from '@shared/components/counter/counter';
import {WaveAudio} from '@info/components/wave-audio/wave-audio';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    Counter,
    WaveAudio,
    FormsModule
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  duration = signal(1000);
  message = signal('Hola');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }
}
