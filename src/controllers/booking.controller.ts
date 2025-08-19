import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AppointmentSlot, Booking, Patient } from '../models';


// Get all bookings
export async function getAllBookings(req: Request, res: Response) {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Patient, attributes: ["id", "name", "email", "phone"] },
        { model: AppointmentSlot, attributes: ["id", "date", "time", "serviceType", "isBooked"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(bookings);
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
}

// Get a single booking by ID
export async function getBookingById(req: Request, res: Response) {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: Patient, attributes: ["id", "name", "email", "phone"] },
        { model: AppointmentSlot, attributes: ["id", "date", "time", "serviceType", "isBooked"] }
      ]
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Error fetching booking" });
  }
}

export async function createSlot(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { date, time, serviceType } = req.body;
  const slot = await AppointmentSlot.create({ date, time, serviceType, isBooked: false });
  res.status(201).json(slot);
}

export async function listSlotsByDate(req: Request, res: Response) {
  const { date } = req.query;
  const where: any = {};
  if (date) where.date = date;
  const slots = await AppointmentSlot.findAll({ where, order: [['date','ASC'], ['time','ASC']] });
  res.json(slots.filter(s => !s.isBooked));
}

export async function bookSlot(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { slotId, patientId } = req.body;
  const slot = await AppointmentSlot.findByPk(slotId);
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  if (slot.isBooked) return res.status(400).json({ message: 'Slot already booked' });
  const booking = await Booking.create({ slotId, patientId, status: 'booked' });
  slot.isBooked = true;
  await slot.save();
  res.status(201).json(booking);
}

export async function cancelBooking(req: Request, res: Response) {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  const slot = await AppointmentSlot.findByPk(booking.slotId);
  if (slot) {
    slot.isBooked = false;
    await slot.save();
  }
  booking.status = 'cancelled';
  await booking.save();
  res.json({ message: 'Booking cancelled', booking });
}
