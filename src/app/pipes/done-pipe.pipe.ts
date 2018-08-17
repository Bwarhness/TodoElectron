import { Pipe, PipeTransform } from '@angular/core';
import { Task, stateEnum } from '../services/task';

@Pipe({
  name: 'donePipe',
  pure: false
})
export class DonePipePipe implements PipeTransform {

  transform(Tasks: Task[], state): any {
    if (Tasks.length > 0) {
      if (state === 1) {
        return Tasks.filter(p => p.State === stateEnum.Completed);
      } else {
        return Tasks.filter(p => p.State !== stateEnum.Completed);
      }
    }
    return [];
  }

}
