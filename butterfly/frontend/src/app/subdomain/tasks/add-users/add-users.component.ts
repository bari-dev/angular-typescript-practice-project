import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddUsersComponent implements OnChanges {
  @Input() tasklist: any = null;
  @Input() task: any = null;
  @Output() updateTask = new EventEmitter<any>();

  contributors: any[] = [];
  newUser: string = '';
  selectedMember: any = null;
  showModal: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private _subdomainAuthService: SubdomainAuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasklist'] && this.tasklist) {
      this.contributors = this.tasklist.users || [];
    }
  }

  addContributor(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const tasklistSlug = this.tasklist.slug;
    const authToken = this._subdomainAuthService.getToken();
    
    if (!authToken) {
      this.errorMessage = 'No authentication token found. Please login again.';
      this.isLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    this.http.post(`http://localhost:3000/api/v1/tasklists/${tasklistSlug}/tasks/${this.task.id}/addUser?memberId=${this.selectedMember.id}`, {}, { headers })
      .pipe(
        catchError(error => {
          this.isLoading = false;
          this.errorMessage = error.error.message;
          return of(null);
        })
      )
      .subscribe((response: any) => {
        this.isLoading = false;

        if (response && response.users) {
          this.contributors = response.users;
          this.emitTaskUpdate();
          this.closeModal();
        }
      });
  }

  removeContributor(contributor: any): void {
    this.contributors = this.contributors.filter(contrib => contrib !== contributor);
    this.emitTaskUpdate();
  }

  private emitTaskUpdate(): void {
    const updatedTask = { ...this.tasklist, users: this.contributors };
    this.updateTask.emit(updatedTask);
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newUser = '';
    this.selectedMember = null;
    this.errorMessage = '';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
