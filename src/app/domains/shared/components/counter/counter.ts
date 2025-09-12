import {
  afterNextRender,
  AfterViewInit,
  Component,
  computed,
  effect,
  input,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter implements OnInit, AfterViewInit, OnDestroy {
  $duration = input.required<number>();
  $message = model.required<string>();
  $doubleDuration = computed(() => this.$duration() * 2);
  $counter = signal(0);
  counterRef: number | null = null;

  constructor() {
    //NO ASYNC
    // before render
    console.log('constructor counter');
    console.log('-'.repeat(10));

    effect(() => {
      this.$duration();
      this.doSomething();
    });

    effect(() => {
      this.$message();
      this.doSomethingTwo();
    });

    afterNextRender(() => {
      this.counterRef = window.setInterval(() => {
        console.log('run interval');
        this.$counter.update((statePrev) => statePrev + 1);
      }, 1000);
    });
  }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.$duration());
    console.log('message =>', this.$message());

  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron pintandos
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    if (this.counterRef) {
      window.clearInterval(this.counterRef);
    }
  }

  doSomething() {
    console.log('change duration');
    // async
  }

  doSomethingTwo() {
    console.log('change message');
    // async
  }

  setMessage() {
    this.$message.set(Math.random().toString());
  }
}
