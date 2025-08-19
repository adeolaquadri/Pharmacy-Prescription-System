import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Patient, Wallet } from '../models';

export async function createPatient(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, phone, dateOfBirth } = req.body;
  const patient = await Patient.create({ name, email, phone, dateOfBirth });
  await Wallet.create({ patientId: patient.id, balance: 0 });
  res.status(201).json(patient);
}

export async function getPatients(_req: Request, res: Response) {
  const patients = await Patient.findAll({ order: [['createdAt','DESC']] });
  res.json(patients);
}

export async function getPatient(req: Request, res: Response) {
  const p = await Patient.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Patient not found' });
  res.json(p);
}

export async function searchPatients(req: Request, res: Response) {
  const q = String(req.query.q || '').toLowerCase();
  const all = await Patient.findAll();
  const filtered = all.filter(p => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
  res.json(filtered);
}
