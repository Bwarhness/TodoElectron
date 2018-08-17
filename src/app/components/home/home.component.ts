import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../services/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
Input: any = '';
  constructor(public _tasks: TasksService) { }

  ngOnInit() {
  }
  SaveTask(event, bla) {
    if (event.keyCode === 13) {
      this._tasks.AddTask(this.Input);
      this.Input = '';
    }
  }
  AssignmentDone(DoneTask: Task) {
    this._tasks.AssignmentDone(DoneTask);
  }
}
