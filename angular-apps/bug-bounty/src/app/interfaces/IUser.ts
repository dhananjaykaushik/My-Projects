import { UserRole } from '../enums/UserRole';

export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  fullName: string;
  phoneNumber?: string;
  partOfTeams?: string[];
}
