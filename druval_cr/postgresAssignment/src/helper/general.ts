/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as generalService from '../services/general';

interface ClassObjI {
  name: string;
  id: string;
}

export function getGenderNotation(gender: any) {
  if (!gender || typeof gender !== 'string' || !gender.trim() || !['male', 'female'].includes(gender.toLowerCase()))
    return null;
  if (gender.toLowerCase() === 'male') return 'M';
  return 'F';
}

export async function reductiveLeaderboard(allClasses: ClassObjI[], result: any[], leaderboardLength: number) {
  try {
    return allClasses.reduce(
      (chain: any, classInfo: ClassObjI) =>
        chain.then(async (value: Record<string, unknown>) => {
          // base condition promise won't have data
          if (value) result.push(value);
          return await generalService.fetchClassLeaderboard(classInfo.id, leaderboardLength);
        }),
      Promise.resolve(),
    );
  } catch (e) {
    throw Error(e);
  }
}
