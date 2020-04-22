import { IUserBugInfo } from './IUserBugInfo';

export interface ITeam {
  tid: string;
  teamName: string;
  teamLeads: string[];
  teamMembers?: string[];
  userBugInfo: Record<string, IUserBugInfo>;
}
