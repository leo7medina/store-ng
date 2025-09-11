import {
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
  counterRef: number | undefined;

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
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   //before and during render
  //   console.log('ngOnChanges counter');
  //   console.log('-'.repeat(10));
  //   if (changes.hasOwnProperty('duration')) {
  //     const duration = changes['duration'];
  //     if (duration.currentValue !== duration.previousValue) {
  //       this.doSomething();
  //     }
  //   }
  // }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.$duration());
    console.log('message =>', this.$message());
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.$counter.update((statePrev) => statePrev + 1);
    }, 1000);
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
    window.clearInterval(this.counterRef);
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
