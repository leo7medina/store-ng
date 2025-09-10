import {Component, Input, signal} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  @Input() duration = 0;
  @Input() message = '';
  counter = signal(0);
}
