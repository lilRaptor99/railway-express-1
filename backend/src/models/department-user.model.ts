import { User } from './user.model';

export interface DepartmentUser extends User {
  address: string;
  stationId: string;
}
