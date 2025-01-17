import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private _toast: BehaviorSubject<{ message: string; type: string }> =
    new BehaviorSubject<{ message: string; type: string }>(null);

  set toast(value: { message: string; type: string }) {
    console.log(
      this._toast.getValue(),
      value,
      this._toast.getValue() !== value
    );
    if (this._toast.getValue() !== value) this._toast.next(value);
  }

  get toast(): { message: string; type: string } {
    return this._toast.getValue();
  }

  get toast$(): Observable<{ message: string; type: string }> {
    return this._toast.asObservable();
  }

  showToast(toastData: { message: string; type: string }) {
    this.toast = toastData;
  }
}
