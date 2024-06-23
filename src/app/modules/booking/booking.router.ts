import express from 'express';
import { checkAvailability, createBooking, deleteBooking, getAllBookings, getUserBookings } from './booking.controller';
import verifyJWT from '../../middlewares/auth';
const router = express.Router();


router.get('/check-availability', checkAvailability);
router.post('/bookings', verifyJWT('user'), createBooking);
router.get('/bookings', verifyJWT('admin'), getAllBookings);
router.get('/bookings/user', verifyJWT('user'), getUserBookings);
router.delete('/bookings/:id', verifyJWT('user'), deleteBooking);

export const bookingRouter = router;
