import mongoose from 'mongoose';
import { TBooking } from './booking.interface';
import Booking from './booking.model';

const createBookingInDb = async (
  payload: TBooking,
  userId: string,
  amount: number,
) => {
  const booking = {
    ...payload,
    user: userId,
    payableAmount: amount,
    isBooked: 'confirmed',
  };

  const newBooking = await Booking.create(booking);
  return newBooking;
};

const getAllBookingsFromDb = async () => {
  const bookings = Booking.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'facilities',
        localField: 'facility',
        foreignField: '_id',
        as: 'facility',
      },
    },
    {
      $unwind: '$facility',
    },
    {
      $project: {
        _id: 1,
        facility: {
          _id: 1,
          name: 1,
          description: 1,
          pricePerHour: 1,
          location: 1,
          isDeleted: 1,
        },
        date: 1,
        startTime: 1,
        endTime: 1,
        user: {
          _id: 1,
          name: 1,
          email: 1,
          phone: 1,
          role: 1,
          address: 1,
        },
        payableAmount: 1,
        isBooked: 1,
      },
    },
  ]);

  return bookings;
};

const getUserBookingsFromDb = async (userId: string) => {
  const bookings = Booking.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'facilities',
        localField: 'facility',
        foreignField: '_id',
        as: 'facility',
      },
    },
    {
      $unwind: '$facility',
    },
    {
      $project: {
        _id: 1,
        facility: {
          _id: 1,
          name: 1,
          description: 1,
          pricePerHour: 1,
          location: 1,
          isDeleted: 1,
        },
        date: 1,
        startTime: 1,
        endTime: 1,
        payableAmount: 1,
        isBooked: 1,
        user: 1,
      },
    },
  ]);

  return bookings;
};

const deleteBookingFromDb = async (id: string) => {
  await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    {
      new: true,
    },
  );

  const bookings = Booking.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'facilities',
        localField: 'facility',
        foreignField: '_id',
        as: 'facility',
      },
    },
    {
      $unwind: '$facility',
    },
    {
      $project: {
        _id: 1,
        facility: {
          _id: 1,
          name: 1,
          description: 1,
          pricePerHour: 1,
          location: 1,
          isDeleted: 1,
        },
        date: 1,
        startTime: 1,
        endTime: 1,
        payableAmount: 1,
        isBooked: 1,
        user: 1,
      },
    },
  ]);

  return bookings;
};

export const BookingService = {
  createBookingInDb,
  getAllBookingsFromDb,
  getUserBookingsFromDb,
  deleteBookingFromDb,
};
