import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Medication, Prescription } from '../models';

export async function createPrescription(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { patientId, medicationName, dosage, quantity } = req.body;

  // Find the medication by name instead of ID
  const med = await Medication.findOne({ where: { name: medicationName } });

  if (!med) {
    return res.status(404).json({ message: 'Medication not found' });
  }

  // Calculate price
  const totalPrice = Number(med.unitPrice) * Number(quantity);

  // Save prescription using medication.id
  const p = await Prescription.create({
    patientId,
    medicationId: med.id,
    dosage,
    quantity,
    totalPrice,
    status: 'pending',
  });

  res.status(201).json(p);
}


export async function listPrescriptions(req: Request, res: Response) {
  const { patientId, status } = req.query;
  const where: any = {};
  if (patientId) where.patientId = patientId;
  if (status) where.status = status;
  const items = await Prescription.findAll({ where, order: [['createdAt','DESC']] });
  res.json(items);
}

export async function updateStatus(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const p = await Prescription.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Prescription not found' });
  const { status } = req.body;
  // If moving to 'filled', decrement stock
  if (p.status === 'pending' && status === 'filled') {
    const med = await Medication.findByPk(p.medicationId);
    if (!med) return res.status(404).json({ message: 'Medication not found' });
    if (Number(med.stock) < p.quantity) return res.status(400).json({ message: 'Insufficient stock' });
    med.stock = Number(med.stock) - Number(p.quantity);
    await med.save();
  }
  p.status = status;
  await p.save();
  res.json(p);
}
