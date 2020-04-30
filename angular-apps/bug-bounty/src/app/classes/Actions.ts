import { IAction } from '../interfaces/IAction';
import { ActionId } from '../enums/ActionId';
import { UserRole } from '../enums/UserRole';

export class Actions {

  static ADMIN_ACTIONS: IAction[] = [
    {
      actionId: ActionId.CREATE_TEAM,
      actionMaterialIcon: 'supervisor_account',
      actionName: 'Create Team',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'default'
    }
  ];

  static CARD_ACTIONS: IAction[] = [
    {
      actionId: ActionId.SET_USER_BUG_COUNT,
      actionMaterialIcon: ' all_inclusive',
      actionName: 'Set Bug Count',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'default'
    },
    {
      actionId: ActionId.ADD_BUG,
      actionMaterialIcon: ' exposure_plus_1',
      actionName: 'Add Bug',
      availableForRoles: [UserRole.ROOT, UserRole.TEAM_LEAD],
      actionClass: 'default'
    },
    {
      actionId: ActionId.RESET_USER_BUG_COUNT,
      actionMaterialIcon: 'exposure_zero',
      actionName: 'Reset Bug Count',
      availableForRoles: [UserRole.ROOT, UserRole.TEAM_LEAD],
      actionClass: 'default'
    },
    {
      actionId: ActionId.MAKE_TEAM_LEADER,
      actionMaterialIcon: 'whatshot',
      actionName: 'Make Team Leader',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'default'
    },
    {
      actionId: ActionId.REMOVE_MEMBER_FROM_TEAM,
      actionMaterialIcon: 'warning',
      actionName: 'Remove User From Team',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'action-red'
    },
    {
      actionId: ActionId.REMOVE_USER_FROM_APP,
      actionMaterialIcon: 'error',
      actionName: 'Permanently Delete User',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'action-red'
    }
  ];

  static TEAM_ACTIONS: IAction[] = [
    {
      actionId: ActionId.DELETE_TEAM,
      actionMaterialIcon: 'delete_forever',
      actionName: 'Delete Team',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'action-red'
    },
    {
      actionId: ActionId.UPDATE_TEAM,
      actionMaterialIcon: 'edit',
      actionName: 'Change Team Name',
      availableForRoles: [UserRole.ROOT, UserRole.TEAM_LEAD],
      actionClass: 'default'
    },
    {
      actionId: ActionId.ADD_MEMBERS_TO_TEAM,
      actionMaterialIcon: 'accessibility',
      actionName: 'Add Members',
      availableForRoles: [UserRole.ROOT],
      actionClass: 'default'
    }
  ];
}

