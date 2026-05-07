import { JxtWorkplaceTypeEnum } from '@jooxter/utils';
import { WorkplaceDtoTypeEnum } from '../model';

export const isWorkplaceDtoTypeEnum = (
  value: WorkplaceDtoTypeEnum | JxtWorkplaceTypeEnum | 'all'
): value is WorkplaceDtoTypeEnum => {
  return Object.values<WorkplaceDtoTypeEnum | JxtWorkplaceTypeEnum | 'all'>(WorkplaceDtoTypeEnum).includes(value);
};
