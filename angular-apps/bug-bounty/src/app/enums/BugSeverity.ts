import { CommonFunctions } from '../classes/CommonFunctions';

export enum BugSeverity {
  SILLY = 0,
  NORMAL,
  MAJOR
}

export const bugSeverityColorGetter = (sev: BugSeverity) => {
  if (sev === BugSeverity.SILLY) {
    return CommonFunctions.materialColors[9];
  } else if (sev === BugSeverity.NORMAL) {
    return CommonFunctions.materialColors[4];
  } else {
    return CommonFunctions.materialColors[1];
  }
};

export const bugSeverityNameGetter = (sev: BugSeverity) => {
  if (sev === BugSeverity.SILLY) {
    return 'Silly';
  } else if (sev === BugSeverity.NORMAL) {
    return 'Normal';
  } else {
    return 'Major';
  }
};
