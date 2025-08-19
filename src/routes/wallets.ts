import { Router } from 'express';
import { body, param } from 'express-validator';
import { auth } from '../middlewares/auth';
import { addFunds, getWallet, payForPrescription, getTransactions } from '../controllers/wallet.controller';

const router = Router();

router.get('/:patientId', auth('admin'), getWallet);
router.get('/:patientId/transactions', auth('admin'), getTransactions);

router.post('/:patientId/fund', auth('admin'),
  body('amount').isFloat({ gt: 0 }),
  addFunds
);

router.post('/:patientId/pay', auth('admin'),
  body('prescriptionId').isString().notEmpty(),
  payForPrescription
);

export default router;
