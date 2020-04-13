import { BugSeverity } from '../enums/BugSeverity';

export interface IBugLog {
  description?: string;
  logDate: Date;
  bugSeverity: BugSeverity;
}
