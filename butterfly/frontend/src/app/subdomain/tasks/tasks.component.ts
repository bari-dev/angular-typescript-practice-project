import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SubdomainAuthService } from '../../core/services/subdomain-auth.service';
import TasklistInterface from '../../core/interfaces/models/tasklist.interface';
import TaskDetailsInterface from '../../core/interfaces/models/tasklist.interface';
import { TaskService } from './task.service';
import { TaskInterface } from '../../core/interfaces/models/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

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
    AddTaskComponent
  ]
})
export class TasksComponent implements AfterViewInit, OnInit {
  tasks: TaskInterface[] = [];
  openModal: boolean = false;
  isModalOpen: boolean = false;
  selectedTask: TaskDetailsInterface | null = null;
  selectedTaskDetails: TaskDetailsInterface | null = null;
  tasklist: TasklistInterface;
  showAlert: boolean = false;
  alertMessage: string = '';
  searchQuery: string = '';
  currentPage: number = 1;
  batchSize: number = 27;
  total: number = 0;
  searchResults: TaskInterface[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<TaskInterface>;
  taskListSlug: string = '';

  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private _subdomainAuthService: SubdomainAuthService,
    private _taskService: TaskService,
    private dialog: MatDialog
  ) {
    if (!this._subdomainAuthService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
    this.tasklist = this._subdomainAuthService.getTasklist();
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  getLinkForName(task: TaskDetailsInterface) {}

  onTaskClick(task: any) {
    this.selectedTaskDetails = task;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async fetchTasks() {
    this.loading = true;
    try {
      const tasks = await this._taskService.getTasks(this.tasklist.slug);
      this.tasks = tasks;
      console.log(tasks);
      this.dataSource = new MatTableDataSource(tasks);
    } catch (error) {
      this.showAlert = true;
      this.alertMessage = 'Error fetching tasks. Please try again later.';
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

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '400px',
      data: {} // Optional: Pass data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Task Created:', result);
      }
    });
  }
}
