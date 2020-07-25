import { Injectable } from '@angular/core';
import { CrudService } from '../../crud.service';
import { User } from '../../../models/user/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService {
  protected namespace = 'users';
  protected namespaceSingular = 'user';
  protected ModelClass = User;
}
