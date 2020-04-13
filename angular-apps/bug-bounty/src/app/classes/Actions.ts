import { IAction } from '../interfaces/IAction';
import { ActionId } from '../enums/ActionId';
import { UserRole } from '../enums/UserRole';

export class Actions {

  static ADMIN_ACTIONS: IAction[] = [
    {
      actionId: ActionId.CREATE_TEAM,
      actionMaterialIcon: 'supervisor_account',
      actionName: 'Create Team',
      availableForRoles: [UserRole.ROOT]
    }
  ];
}
