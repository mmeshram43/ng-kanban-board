import { Component } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from "@angular/material/dialog";
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor( private dialog : MatDialog) {
    
  }

  title = 'kanban-fire';
  todo: Task[] = [
  ];

  inProgress: Task[] = [];
  done: Task[] = [];

newTask() : void{
  const dialogRef = this.dialog.open(TaskDialogComponent, {
    width : '270px',
    data : {
      task : {}
    },
  });
  dialogRef
  .afterClosed()
  .subscribe((result : TaskDialogResult) => this.todo.push(result.task) );
}


  editTask(list: string, task: Task): void { }

  drop(event: CdkDragDrop<Task[] | any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}