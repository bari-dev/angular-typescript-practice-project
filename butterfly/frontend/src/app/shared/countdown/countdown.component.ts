import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() targetDate!: string | Date;
  currentDate: Date = new Date();
  countdown: string = 'Loading...';
  private interval: any;

  ngOnInit(): void {
    this.countDown();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  countDown(): void {
    const targetDateTime = new Date(this.targetDate).getTime();
    const currentDateTime = this.currentDate.getTime();

    if (isNaN(targetDateTime)) {
      this.countdown = 'Invalid target date.';
      return;
    }

    if (targetDateTime > currentDateTime) {
      this.startCountdown();
    } else {
      this.pastDue();
    }
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const targetDateTime = new Date(this.targetDate).getTime();
      const timeLeft = targetDateTime - now;

      const days    = Math.floor(timeLeft / (86400000));
      const hours   = Math.floor((timeLeft % (86400000)) / (3600000));
      const minutes = Math.floor((timeLeft % (3600000)) / (60000));
      const seconds = Math.floor((timeLeft % (60000)) / 1000);

      this.countdown = `${days} days ${(hours * 60) + minutes} minutes ${seconds} seconds until due`;
    }, 1000);
  }

  pastDue(): void {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const targetDateTime = new Date(this.targetDate).getTime();
      const timeLeft = now - targetDateTime;

      const days    = Math.floor(timeLeft / (86400000));
      const hours   = Math.floor((timeLeft % (86400000)) / (3600000));
      const minutes = Math.floor((timeLeft % (3600000)) / (60000));
      const seconds = Math.floor((timeLeft % (60000)) / 1000);

      this.countdown = `${days} days ${(hours * 60) + minutes} minutes ${seconds} seconds past due`;
    }, 1000);
  }
}
