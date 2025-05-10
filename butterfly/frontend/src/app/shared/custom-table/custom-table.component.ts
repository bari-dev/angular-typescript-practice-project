import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() pageSize: number = 10;
  @Input() totalRecords: number = 0;
  @Output() pageChanged = new EventEmitter<any>();

  dataSource = new BehaviorSubject<any[]>([]);
  currentPage = 0;
  sortColumn: string = '';
  sortDirection: string = '';

  constructor() {}

  ngOnInit(): void {
    this.dataSource.next(this.data);
  }

  ngOnChanges(): void {
    this.dataSource.next(this.data);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageChanged.emit({ pageIndex: this.currentPage, pageSize: this.pageSize });
  }
}
