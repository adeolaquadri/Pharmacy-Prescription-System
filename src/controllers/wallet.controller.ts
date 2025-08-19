import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Wallet, Patient, Transaction, Prescription } from '../models';

export async function getWallet(req: Request, res: Response) {
  const { patientId } = req.params;
  const wallet = await Wallet.findOne({ where: { patientId } });
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
  res.json(wallet);
}

export async function getTransactions(req: Request, res: Response) {
  const { patientId } = req.params;
  const wallet = await Wallet.findOne({ where: { patientId } });
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
  const tx = await Transaction.findAll({ where: { walletId: wallet.id }, order: [['createdAt','DESC']] });
  res.json(tx);
}

export async function addFunds(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { patientId } = req.params;
  const { amount } = req.body;
  let wallet = await Wallet.findOne({ where: { patientId } });
  if (!wallet) {
    const p = await Patient.findByPk(patientId);
    if (!p) return res.status(404).json({ message: 'Patient not found' });
    wallet = await Wallet.create({ patientId, balance: 0 });
  }
  wallet.balance = Number(wallet.balance) + Number(amount);
  await wallet.save();
  await Transaction.create({ walletId: wallet.id, type: 'credit', amount, description: 'Wallet funding' });
  res.json(wallet);
}

export async function payForPrescription(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { patientId } = req.params;
  const { prescriptionId } = req.body;
  const wallet = await Wallet.findOne({ where: { patientId } });
  if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
  const pres = await Prescription.findByPk(prescriptionId);
  if (!pres || pres.patientId !== patientId) return res.status(404).json({ message: 'Prescription not found' });
  if (pres.status !== 'filled') return res.status(400).json({ message: 'Only filled prescriptions can be paid' });
  const amount = Number(pres.totalPrice);
  if (Number(wallet.balance) < amount) return res.status(400).json({ message: 'Insufficient funds' });
  wallet.balance = Number(wallet.balance) - amount;
  await wallet.save();
  await Transaction.create({ walletId: wallet.id, type: 'debit', amount, description: `Payment for Rx ${pres.id}` });
  pres.status = 'picked-up';
  await pres.save();
  res.json({ walletBalance: wallet.balance, prescription: pres });
}
