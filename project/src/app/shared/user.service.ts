import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class UserService {

  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor() { }

}
