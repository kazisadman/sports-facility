import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityInDb = async (payload: TFacility) => {
  const newFacility = await Facility.create(payload);
  return newFacility;
};

const updateFacilityInDb = async (id: string, payload: TFacility) => {
  const updateFacility = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updateFacility;
};

export const facilityService = { createFacilityInDb, updateFacilityInDb };
