import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() targetDate!: string | Date;

  countdown: string = 'Loading...';
  private interval: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval); // Clean up interval when component is destroyed
    }
  }

  startCountdown(): void {
    // Ensure the targetDate is converted to a Date object if it's a string
    const dueDate = new Date(this.targetDate).getTime();
    if (isNaN(dueDate)) {
      this.countdown = 'Invalid target date.';
      return;
    }

    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = dueDate - now;

      if (timeLeft <= 0) {
        this.countdown = `The due date has passed!`;
        clearInterval(this.interval);
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      this.countdown = `${days} days ${minutes} minutes ${seconds} seconds`;
    }, 1000);
  }
}
