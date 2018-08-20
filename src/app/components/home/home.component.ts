import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../services/task';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
Input: any = '';
  constructor(public _tasks: TasksService, public _electron: ElectronService) {
    this._electron.ipcRenderer.on('focus', () => {
      document.getElementById('Input').focus();
    });
   }

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
  AssignmentDelete(DeletedTask: Task) {
    this._tasks.AssignmentDelete(DeletedTask);
  }
}
