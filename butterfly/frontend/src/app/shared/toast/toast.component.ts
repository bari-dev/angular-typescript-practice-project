import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ToastService } from "./toast.service";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  showToast: boolean = false;
  toastMessage: string = "";
  toastType: string;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(
      (toastData: { message: string; type: "success" | "error" }) => {
        this.showToast = false;
        if (toastData && toastData.type && toastData.message) {
          this.showToast = true;
          this.toastMessage = toastData.message;
          this.toastType = toastData.type;
        }
        setTimeout(() => {
          this.closeToast();
        }, 7000);
      }
    );
  }

  closeToast() {
    this.showToast = false;
    this.toastMessage = "";
  }
}
