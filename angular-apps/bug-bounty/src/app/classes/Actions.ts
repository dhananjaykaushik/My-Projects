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

  static CARD_ACTIONS: IAction[] = [
    {
      actionId: ActionId.SET_USER_BUG_COUNT,
      actionMaterialIcon: ' all_inclusive',
      actionName: 'Set Bug Count',
      availableForRoles: [UserRole.ROOT]
    },
    {
      actionId: ActionId.ADD_BUG,
      actionMaterialIcon: ' exposure_plus_1',
      actionName: 'Add Bug',
      availableForRoles: [UserRole.ROOT, UserRole.TEAM_LEAD]
    },
    {
      actionId: ActionId.RESET_USER_BUG_COUNT,
      actionMaterialIcon: 'exposure_zero',
      actionName: 'Reset Bug Count',
      availableForRoles: [UserRole.ROOT, UserRole.TEAM_LEAD]
    }
  ];
}



// <button mat-menu-item>

//               <button mat-menu-item>
//                 <span class="material-icons">
//                   exposure_plus_1
//                 </span>
//                 <span>Add bug</span>
//               </button>
