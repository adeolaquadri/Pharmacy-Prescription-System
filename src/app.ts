import express from 'express';
import dotenv from 'dotenv';
import { json } from 'express';
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';
import prescriptionRoutes from './routes/prescriptions';
import medicationRoutes from './routes/medications';
import walletRoutes from './routes/wallets';
import bookingRoutes from './routes/bookings';
import { errorHandler, notFound } from './middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(json());

app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'Pharmacy Prescription System API' });
});

app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/medications', medicationRoutes);
app.use('/wallets', walletRoutes);
app.use('/', bookingRoutes); // slots + bookings

app.use(notFound);
app.use(errorHandler);

export default app;
