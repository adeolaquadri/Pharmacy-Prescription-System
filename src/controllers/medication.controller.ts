import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Medication } from '../models';

export async function createMedication(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, stock, unitPrice } = req.body;
  const med = await Medication.create({ name, stock, unitPrice });
  res.status(201).json(med);
}

export async function updateMedication(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const med = await Medication.findByPk(req.params.id);
  if (!med) return res.status(404).json({ message: 'Medication not found' });
  const { stock, unitPrice } = req.body;
  if (stock !== undefined) med.stock = stock;
  if (unitPrice !== undefined) med.unitPrice = unitPrice;
  await med.save();
  res.json(med);
}

export async function lowStock(_req: Request, res: Response) {
  const meds = await Medication.findAll();
  res.json(meds.filter(m => Number(m.stock) < 10));
}

export async function getAllMedications(req: Request, res: Response) {
  try {
    const meds = await Medication.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(meds);
  } catch (err: any) {
    console.error("Error fetching medications:", err);
    res.status(500).json({ message: "Failed to fetch medications" });
  }
}
