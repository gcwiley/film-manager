import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
   standalone: true,
   selector: 'app-clock',
   templateUrl: './clock.component.html',
   styleUrl: './clock.component.scss',
   imports: [DatePipe],
})
export class ClockComponent implements OnInit, OnDestroy {
   // stores the current time as a Date object
   currentTime: Date = new Date();
   private timeSubscription!: Subscription;

   ngOnInit(): void {
      this.timeSubscription = interval(1000).subscribe(() => {
         this.currentTime = new Date();
      });
   }

   ngOnDestroy(): void {
      if (this.timeSubscription) {
         this.timeSubscription.unsubscribe;
      }
   }
}
