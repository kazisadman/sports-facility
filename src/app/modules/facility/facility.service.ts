import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityInDb = async (payload: TFacility) => {
  const newUser = await Facility.create(payload);
  return newUser;
};

export const facilityService = { createFacilityInDb };
