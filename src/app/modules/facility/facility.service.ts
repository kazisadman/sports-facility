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

const deleteFacilityFromDb = async (id: string) => {
  const deleteFacility = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return deleteFacility;
};

const getAllFacilityFromDb = async () => {
  const getAll = await Facility.find().select('-createdAt -updatedAt -__v');
  return getAll;
};

export const facilityService = {
  createFacilityInDb,
  updateFacilityInDb,
  deleteFacilityFromDb,
  getAllFacilityFromDb,
};
