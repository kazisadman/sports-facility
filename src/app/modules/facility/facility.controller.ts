import { Request, Response } from 'express';
import { FacilityValidationSchema } from './facility.validation';
import { facilityService } from './facility.service';
import { Facility } from './facility.model';
import { ApiResponse } from '../../utils/sendResponse';

const createFacility = async (req: Request, res: Response) => {
  const facilityData = req.body;

  if (req.user?.role === 'admin') {
    const validatedData = FacilityValidationSchema.parse(facilityData);

    const facility = await facilityService.createFacilityInDb(validatedData);

    const result = await Facility.findById(facility?._id).select(
      '-createdAt -updatedAt -__v',
    );

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility added successfully'));
  } else {
    console.log('unauthorized');
  }
};

const updateFacility = async (req: Request, res: Response) => {
  const facilityData = req.body;
  const { id } = req.params;

  if (req.user?.role === 'admin') {
    const validatedData = FacilityValidationSchema.parse(facilityData);

    const facility = await facilityService.updateFacilityInDb(
      id,
      validatedData,
    );

    const result = await Facility.findById(facility?._id).select(
      '-createdAt -updatedAt -__v',
    );

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility updated successfully'));
  } else {
    console.log('unauthorized');
  }
};

const deleteFacility = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.user?.role === 'admin') {
    const facility = await facilityService.deleteFacilityFromDb(id);

    const result = await Facility.findById(facility?._id).select(
      '-createdAt -updatedAt -__v',
    );

    res
      .status(200)
      .json(new ApiResponse(200, result, 'Facility deleted successfully'));
  } else {
    console.log('unauthorized');
  }
};

const getAllFacility = async (req:Request,res:Response) => {
  const result = await facilityService.getAllFacilityFromDb();

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Facilities retrieved successfully'));
};

export { createFacility, deleteFacility, updateFacility, getAllFacility };
