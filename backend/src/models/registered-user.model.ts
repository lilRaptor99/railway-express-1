import { User } from './user.model';

export interface RegisteredUser extends User {
  token: string;
}
