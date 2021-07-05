/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function getGenderNotation(gender: any) {
  if (!gender || typeof gender !== 'string' || !gender.trim() || !['male', 'female'].includes(gender.toLowerCase()))
    return null;
  if (gender.toLowerCase() === 'male') return 'M';
  return 'F';
}
