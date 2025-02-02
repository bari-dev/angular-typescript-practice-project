import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SubdomainAuthService } from '../../core/services/subdomain-auth.service';
import TaskDetailsInterface from '../../core/interfaces/models/tasklist.interface';
import { TaskService } from './task.service';
import { TaskInterface } from '../../core/interfaces/models/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { CountdownComponent } from '../../shared/countdown/countdown.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ContributorsComponent } from './contributors/contributors.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { TasklistService } from '../../core/services/tasklist.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import UserInterface from '../../core/interfaces/models/user.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    TaskDetailsComponent,
    AddTaskComponent,
    CountdownComponent,
    AddUsersComponent,
    ContributorsComponent,
    AddMemberComponent
  ],
})
export class TasksComponent implements OnInit {
  tasks: TaskInterface[] = [];
  openModal: boolean = false;
  isModalOpen: boolean = false;
  selectedTask: TaskDetailsInterface | null = null;
  selectedTaskDetails: TaskDetailsInterface | null = null;
  tasklist: any;
  showAlert: boolean = false;
  alertMessage: string = '';
  searchQuery: string = '';
  currentPage: number = 1;
  batchSize: number = 27;
  filterOption: string = 'all';
  total: number = 0;
  searchResults: TaskInterface[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['sn', 'title', 'due-date', 'status', 'actions'];
  dataSource = new MatTableDataSource<TaskInterface>();
  tasklistId: string = '';
  isActionAllow: boolean = false;
  currentUser: UserInterface | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private _subdomainAuthService: SubdomainAuthService,
    private _taskService: TaskService,
    private _tasklistService: TasklistService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
    if (!this._subdomainAuthService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
    this.currentUser = this._subdomainAuthService.getUser();
    this.tasklist = this._subdomainAuthService.getTasklist();
    this.tasklistId = this.tasklist.id
    this.isActionAllow = this.tasklist.creatorId === this._subdomainAuthService.getUser()?.id;
  }
  
  ngOnInit(): void {
    this.fetchTasksAndTasklist();  
  }

  fetchTasksAndTasklist(): void {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const filter = params['filter'];
  
      if (filter && filter !== this.filterOption) {
        this.filterOption = filter;
      }
  
      try {
        await this.fetchTasklist();
        await this.fetchTasks();
      } catch (error) {
        console.error('Error fetching tasklist or tasks:', error);
      }
    });
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  triggerModal(task: TaskDetailsInterface) {
    if (task) this.selectedTask = task;
    else this.selectedTask = null;
    this.openModal = true;
  }

  onTaskClick(task: any) {
    this.selectedTaskDetails = task;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  fetchTasklist() {
    this.loading = true;
    this._tasklistService.getTasklistById(this._subdomainAuthService.getTasklist().id).subscribe({
      next: (tasklist: any) => {
        this.tasklist = tasklist;
        console.log('tasklist', tasklist);
      },
      error: (error: any) => {
        this.showAlert = true;
        this.alertMessage = error.error?.message || 'An error occurred';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  async fetchTasks() {
    this.loading = true;
    try {
      const data: any = await this._taskService.getTaskBySearchFilter(this._subdomainAuthService.getTasklist().slug, this.filterOption);
      this.tasks = data.tasks;
      console.log(this.tasks);
      this.dataSource = new MatTableDataSource(data.tasks);
    } catch (error: any) {
      this.showAlert = true;
      this.alertMessage = error.error.message;
    } finally {
      this.loading = false;
    }
  }

  onSearchQueryChange() {
    this.fetchTasks();
  }

  onLogout(): void {
    this._subdomainAuthService.logout();
    this.router.navigateByUrl('/');
  }

  openAddTaskModal(task?: TaskInterface): void {
    this.dialog.closeAll();
    this.dialog
      .open(AddTaskComponent, {
        width: '500px',
        data: task
          ? { tasklist: this.tasklist, taskToEdit: task, tasklistSlug: this.tasklist.slug }
          : { tasklist: this.tasklist },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          if (task) {
            this.tasks.findIndex((stask) => stask.id === task.id);
          } else {
            this.tasks.unshift(data);
            this.dataSource.filter = '';
          }
        }
      });
  }

  openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px',
      data: this.tasklist,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTasks();
      }
    });
  }

  onFilterChange(option: string): void {
    this.filterOption = option;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { filter: this.filterOption },
      queryParamsHandling: 'merge',
    });

    this.fetchTasks();
  }

  async onTasklistUpdate(updatedTasklist: any): Promise<void> {
    await this.fetchTasklist();
  }

  async deleteTask(deletedTask: any): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to delete this ${deletedTask.title} tasklist?`,
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel'
      }
    });
  
    const result = await dialogRef.afterClosed().toPromise();
  
    if (result) {
      this.loading = true;
      try {
        await this._taskService.deleteTask(this.tasklist.slug, deletedTask.id);
        this.tasks = this.tasks.filter(task => task.id !== Number(deletedTask.id));
        this.dataSource.data = this.tasks;
        this.dataSource.filter = '';
      } catch (error: any) {
        console.error('Error deleting tasklist:', error);
        this.showAlert = true;
        this.alertMessage = error.error?.message || 'An error occurred while deleting the tasklist.';
      } finally {
        this.loading = false;
      }
    }
  }  
}
