import { Resource, ResourceCompressed } from '../model';

export const isResource = (obj: Resource | ResourceCompressed): obj is Resource => {
  return 'location' in obj;
};

export const isResourceCompressed = (obj: Resource | ResourceCompressed): obj is ResourceCompressed => {
  return 'locationId' in obj;
};
