import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  showToast: boolean = false;
  private toastSubscription?: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toastState$.subscribe(
      (toast: Toast) => {
        this.toastMessage = toast.message;
        this.toastType = toast.type;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, toast.duration);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  closeToast() {
    this.showToast = false;
  }
}
