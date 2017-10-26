import { Alias, AppModel } from 'tsmodels';

export class User extends AppModel {
  @Alias('user_id') public id: number;
  @Alias('name') public name: string;
}

