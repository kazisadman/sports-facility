import { Request, Response } from 'express';
import { FacilityValidationSchema } from './facility.validation';
import { facilityService } from './facility.service';
import { Facility } from './facility.model';
import { ApiResponse } from '../../utils/sendResponse';

const createFacility = async (req: Request, res: Response) => {
  const facilityData = req.body;

  const validatedData = FacilityValidationSchema.parse(facilityData);

  const facility = await facilityService.createFacilityInDb(validatedData);

  const result = await Facility.findById(facility?._id).select(
    '-createdAt -updatedAt -__v',
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Facility added successfully'));
};

export { createFacility };
