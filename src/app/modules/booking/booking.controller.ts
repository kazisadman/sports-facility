import { Request, Response } from 'express';
import Booking from './booking.model';
import { BookingService } from './booking.service';
import { ApiResponse } from '../../utils/sendResponse';
import { Facility } from '../facility/facility.model';
import handleAsync from '../../utils/handleAsync';
import { DbError } from '../../errors/DbError';

const checkAvailability = handleAsync(async (req: Request, res: Response) => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate() + 1).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  const queryDate = req.query.date || getTodayDate();

  const bookings = await Booking.find();

  const availableSlot = [];
  const totalAvaliableHour = { startTime: '10:00', endTime: '20:00' };

  const startTime = new Date(`${queryDate}T${totalAvaliableHour.startTime}`);
  const endTime = new Date(`${queryDate}T${totalAvaliableHour.endTime}`);

  for (
    let time = startTime;
    time < endTime;
    time.setHours(time.getHours() + 2)
  ) {
    const slotStartTime = new Date(time);
    const slotEndTime = new Date(time);
    slotEndTime.setHours(slotEndTime.getHours() + 2);

    const isAvailable = !bookings.some((booking) => {
      const bookingStartTime = new Date(`${queryDate}T${booking.startTime}`);
      const bookingEndTime = new Date(`${queryDate}T${booking.endTime}`);
      return bookingStartTime < slotEndTime && bookingEndTime > slotStartTime;
    });

    if (isAvailable) {
      availableSlot.push({
        startTime: slotStartTime.toTimeString().slice(0, 5),
        endTime: slotEndTime.toTimeString().slice(0, 5),
      });
    }
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Availability checked successfully',
    data: availableSlot,
  });
});

const createBooking = handleAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const facility = await Facility.findById(bookingData.facility);

  const pricePerHour = facility?.pricePerHour;
  const startTime = bookingData?.startTime;
  const endTime = bookingData?.endTime;

  const totalAmount = (parseInt(endTime) - parseInt(startTime)) * pricePerHour;

  const existingBookings = await Booking.find({
    facility: bookingData.facility,
    date: bookingData.date,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
  });

  if (existingBookings.length > 0) {
    return res
      .status(409)
      .json(
        new ApiResponse(
          409,
          null,
          'Facility is unavailable during the requested time slot',
        ),
      );
  }

  const booking = await BookingService.createBookingInDb(
    bookingData,
    req.user?._id,
    totalAmount,
  );

  const result = await Booking.findById(booking?._id).select(
    '-createdAt -updatedAt -__v',
  );

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Booking created successfully'));
});

const getAllBookings = handleAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingsFromDb();

  if (!result) {
    return res.status(404).json(new DbError());
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Bookings retrieved successfully'));
});
const getUserBookings = handleAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getUserBookingsFromDb(req.user?._id);

  if (!result) {
    return res.status(404).json(new DbError());
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Bookings retrieved successfully'));
});

const deleteBooking = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteBookingFromDb(id);

  if (!result) {
    return res.status(404).json(new DbError());
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, 'Booking cancelled successfully'));
});

export {
  checkAvailability,
  createBooking,
  getAllBookings,
  getUserBookings,
  deleteBooking,
};
