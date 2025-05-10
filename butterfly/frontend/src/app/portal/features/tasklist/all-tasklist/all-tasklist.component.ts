import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasklistService } from 'src/app/core/services/tasklist.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TasklistInterface from 'src/app/core/interfaces/models/tasklist.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

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
  totalTasklists: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tasklistService: TasklistService,
    private dialog: MatDialog,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  deleteTasklist(deletedTasklist: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to delete this ${deletedTasklist.name} tasklist?`,
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasklistService.deleteTasklist(deletedTasklist.id).subscribe(
          () => {
            this.tasklists = this.tasklists.filter(tasklist => tasklist.id !== Number(deletedTasklist.id));
            this.dataSource.data = this.tasklists;
            this.dataSource.filter = '';
          },
          (error: any) => {
            console.error('Error deleting tasklist:', error);
          }
        );
      }
    });
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
}
