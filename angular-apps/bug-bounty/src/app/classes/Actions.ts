import { IAction } from '../interfaces/IAction';
import { ActionId } from '../enums/ActionId';
import { UserRole } from '../enums/UserRole';

export class Actions {
  static CARD_ACTIONS: IAction[] = [
    {
      actionId: ActionId.REFRESH,
      actionMaterialIcon: 'refresh',
      actionName: 'Refresh',
      availableForRoles: [UserRole.ROOT, UserRole.TEAM_LEAD, UserRole.MEMBER]
    }
  ];
}
