import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TasklistService } from 'src/app/core/services/tasklist.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TasklistInterface from 'src/app/core/interfaces/models/tasklist.interface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-all-tasklist',
  templateUrl: './all-tasklist.component.html',
  styleUrls: ['./all-tasklist.component.css']
})
export class AllTasklistComponent implements OnInit, AfterViewInit {
  tasklists: TasklistInterface[] = [];
  displayedColumns: string[] = ['tasklistNumber', 'name', 'creator', 'members', 'createdAt', 'actions'];
  currentUserId?: number;
  dataSource: MatTableDataSource<TasklistInterface>;
  filterOption: string = 'all';
  totalTasklists: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tasklistService: TasklistService,
    private _authService: AuthService,
  ) {
    this.dataSource = new MatTableDataSource();
    this.currentUserId = _authService.getUser()?.id;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadTasklists();
  }

  openTaskListPage(tasklist: TasklistInterface): void {
    const subdomain = tasklist.slug;
    const url = `http://${subdomain}.localhost:4200`;
    window.open(url, '_blank');
  }

  onPageChanged(event: any): void {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.loadTasklists(pageIndex, pageSize);
  }

  loadTasklists(page: number = 1, pageSize: number = 5): void {
    this.tasklistService.getTasklists(page, pageSize).subscribe(
      (data: any) => {
        this.tasklists = data.taskLists;
        this.dataSource.data = this.tasklists;
        this.totalTasklists = data.totalTaskLists;
      },
      (error: any) => {
        console.error('Error loading tasklists:', error);
      }
    );
  }

  filterTasks(): void {
    switch (this.filterOption) {
      case 'incomplete':
        this.tasklists = this.tasklists.filter(tasklist => !tasklist.completed);
        break;
      case 'complete':
        this.tasklists = this.tasklists.filter(tasklist => tasklist.completed);
        break;
      case 'past_due':
        const currentDate = new Date();
        this.tasklists = this.tasklists.filter(tasklist => new Date(tasklist.dueDate) < currentDate);
        break;
      case 'all':
        this.loadTasklists();
        break;
    }
    this.dataSource.data = this.tasklists;
  }

  onFilterChange(option: string): void {
    this.filterOption = option;
    this.filterTasks();
  }
}
