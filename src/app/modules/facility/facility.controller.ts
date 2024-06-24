import { Request, Response } from 'express';
import { FacilityValidationSchema } from './facility.validation';
import { facilityService } from './facility.service';
import { Facility } from './facility.model';
import { ApiResponse } from '../../utils/sendResponse';
import handleAsync from '../../utils/handleAsync';
import { DbError } from '../../errors/DbError';

const createFacility = handleAsync(async (req: Request, res: Response) => {
  const facilityData = req.body;

    const validatedData = FacilityValidationSchema.parse(facilityData);

    const facility = await facilityService.createFacilityInDb(validatedData);

    const result = await Facility.findById(facility?._id).select(
      '-createdAt -updatedAt -__v',
    );

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility added successfully'));
});

const updateFacility = handleAsync(async (req: Request, res: Response) => {
  const facilityData = req.body;
  const { id } = req.params;

    const validatedData = FacilityValidationSchema.parse(facilityData);

    const facility = await facilityService.updateFacilityInDb(
      id,
      validatedData,
    );

    if (!facility) {
      return res.status(404).json(new DbError());
    }

    const result = await Facility.findById(facility?._id).select(
      '-createdAt -updatedAt -__v',
    );

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility updated successfully'));
});

const deleteFacility = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;


    const facility = await facilityService.deleteFacilityFromDb(id)
    
    if (!facility) {
      return res.status(404).json(new DbError());
    }

    const result = await Facility.findById(facility?._id).select(
      '-createdAt -updatedAt -__v',
    );

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility added successfully'));
});

const getAllFacility = handleAsync(async (req: Request, res: Response) => {


    const result = await facilityService.getAllFacilityFromDb();

    if (!result) {
      return res.status(404).json(new DbError());
    }

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility added successfully'));
});

export { createFacility, deleteFacility, updateFacility, getAllFacility };
