import { UserRole } from '../enums/UserRole';
import { IBugLog } from './IBugLog';

export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  fullName: string;
  phoneNumber?: string;
  partOfTeams?: string[];
  bugCounter: number;
  logTracker: IBugLog[];
}
