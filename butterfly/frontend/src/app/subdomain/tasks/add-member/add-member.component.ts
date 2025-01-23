import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubdomainAuthService } from '../../../core/services/subdomain-auth.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddMemberComponent implements OnChanges {
  @Input() tasklist: any = null;
  @Output() updateTask = new EventEmitter<any>();

  contributors: any[] = [];
  newUserEmail: string = ''; // Renamed variable for clarity
  showModal: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  tasklistMembers: any[] = [];

  constructor(
    private http: HttpClient,
    private _subdomainAuthService: SubdomainAuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasklist'] && this.tasklist) {
      this.contributors = this.tasklist.members || [];
      this.tasklistMembers = this.tasklist.members || [];
    }
  }

  addContributor(): void {
    let userEmail = this.newUserEmail.trim();

    if (!userEmail) return;

    if (!this.isValidEmail(userEmail)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

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

    this.http.post(`http://localhost:3000/api/v1/tasklists/${tasklistSlug}/addUser?userEmail=${userEmail}`, {}, { headers })
      .pipe(
        catchError(error => {
          this.isLoading = false;
          this.errorMessage = error.error.message;
          return of(null);
        })
      )
      .subscribe(response => {
        this.isLoading = false;

        if (response) {
          this.contributors.push({ name: userEmail });
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
    this.newUserEmail = ''; // Reset input when modal is opened
    this.errorMessage = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.newUserEmail = ''; // Reset input when modal is closed
    this.errorMessage = '';
  }

  closePanel(): void {
    this.tasklist = null;
    this.contributors = [];
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
