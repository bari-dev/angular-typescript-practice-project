import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TaskDetailsComponent
  ]
})
export class TaskDetailsComponent implements OnChanges {
  @Input() task: any = null;
  @Output() isModalOpen = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.isModalOpen = true;
    }
  }

  closePanel() {
    this.isModalOpen = false;
    this.task   = null;
  }

  markComplete(){

  }

  editTask(){
    
  }
}
