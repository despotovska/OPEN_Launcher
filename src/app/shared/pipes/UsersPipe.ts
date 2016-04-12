import {Pipe, PipeTransform} from 'angular2/core';

import {User} from '../models/User';

@Pipe({
  name: 'usernameContains'
})
export class UsersPipe implements PipeTransform {
  transform(value: User[], args?: any[]): any {
    return value.filter(item => item.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
  }
}
