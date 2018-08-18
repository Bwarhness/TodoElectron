import { Injectable } from '@angular/core';
import { Task, stateEnum } from './task';
import { ElectronService } from '../providers/electron.service';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  Tasks: Task[] = [];
  constructor(public _electron: ElectronService) {
      this.Tasks = this._electron.ipcRenderer.sendSync('getTasks');
      if (this.Tasks === undefined || this.Tasks.length === 0 ||
         Object.keys(this.Tasks).length === 0 && this.Tasks.constructor === Object) {
        this.Tasks = [];
      }
   }




   AddTask(input: string) {
    if (input !== '') {
      this.Tasks.unshift(
        {
         Name: input,
         State: stateEnum.Created
        }
      );
    }
    console.log(this.Tasks);
    this.SaveFile(this.Tasks);
   }
   AssignmentDone(DoneAssignment: Task) {
     const doneTask =  this.Tasks.find(p => p === DoneAssignment);
     doneTask.State = stateEnum.Completed;
     this.SaveFile(this.Tasks);
   }
   AssignmentDelete(DeletedTask: Task) {
    const index = this.Tasks.indexOf(DeletedTask);
    this.Tasks.splice(index, 1);
    this.SaveFile(this.Tasks);
   }
   SaveFile(obj) {
    this._electron.ipcRenderer.send('saveTask', this.Tasks);
   }
}
