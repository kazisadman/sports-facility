import { ObjectId } from "mongoose";

export type TBooking = {
  date: string; 
  startTime: string; 
  endTime: string; 
  user: ObjectId; 
  facility: ObjectId; 
  payableAmount: number; 
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
};
