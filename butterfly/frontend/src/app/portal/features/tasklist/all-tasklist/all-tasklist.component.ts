import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TasklistService } from 'src/app/core/services/tasklist.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TasklistInterface from 'src/app/core/interfaces/models/tasklist.interface';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-all-tasklist',
  templateUrl: './all-tasklist.component.html',
  styleUrls: ['./all-tasklist.component.css']
})
export class AllTasklistComponent implements OnInit, AfterViewInit {
  tasklists: any[] = [];
  displayedColumns: string[] = ['tasklistNumber', 'name', 'userId', 'createdAt', 'updatedAt', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tasklistService: TasklistService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadTasklists();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openTaskListPage(tasklist: TasklistInterface): void {
    const subdomain = tasklist.name.toLowerCase().replace(/\s/g, '-');
    const url = `http://${subdomain}.localhost:4200`;
    window.open(url, '_blank');
  }

  loadTasklists(): void {
    this.tasklistService.getTasklists().subscribe(
      (data: any) => {
        this.tasklists = data;
        this.dataSource.data = this.tasklists;
      },
      (error: any) => {
        console.error('Error loading tasklists:', error);
      }
    );
  }
}
