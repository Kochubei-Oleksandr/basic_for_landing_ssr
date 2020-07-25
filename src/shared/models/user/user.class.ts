import { ActiveRecord } from '../active-record.class';
import { UserService } from '../../services/components/user/user.service';

export class User extends ActiveRecord {
  protected provider = UserService;

  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public usage_policy: boolean;
  public language: string;


  protected fields() {
    return [
      'id',
      'name',
      'email',
      'password',
      'usage_policy',
      'language',
    ];
  }
}
