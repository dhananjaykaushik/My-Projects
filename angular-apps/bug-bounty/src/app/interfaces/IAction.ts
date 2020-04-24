import { UserRole } from '../enums/UserRole';
import { ActionId } from '../enums/ActionId';

export interface IAction {
  actionId: ActionId;
  actionName: string;
  actionMaterialIcon: string;
  availableForRoles: UserRole[];
  actionClass: string;
}
