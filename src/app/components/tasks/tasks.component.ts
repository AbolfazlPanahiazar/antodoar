import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        (tasks) => (this.tasks = this.tasks.filter((i) => i.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService
      .updateTaskReminder(task)
      .subscribe(
        (tasks) => (this.tasks = this.tasks.filter((i) => i.id !== task.id))
      );
  }
}
