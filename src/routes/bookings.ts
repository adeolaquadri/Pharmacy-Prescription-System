import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { auth } from '../middlewares/auth';
import { createSlot, listSlotsByDate, bookSlot, cancelBooking, getBookingById, getAllBookings } from '../controllers/booking.controller';

const router = Router();

router.post('/slots', auth('admin'),
  body('date').isISO8601(),
  body('time').isString().notEmpty(),
  body('serviceType').isIn(['consultation','pickup']),
  createSlot
);

router.get('/slots', auth('admin'),
  query('date').optional().isISO8601(),
  listSlotsByDate
);

router.post('/bookings', auth('admin'),
  body('slotId').isString().notEmpty(),
  body('patientId').isString().notEmpty(),
  bookSlot
);

router.delete('/bookings/:id', auth('admin'),
  param('id').isString(),
  cancelBooking
);

router.get('/bookings', auth('admin'), getAllBookings);
router.get('/bookings/:id', auth('admin'),
  param('id').isString(),
  getBookingById
);

export default router;
