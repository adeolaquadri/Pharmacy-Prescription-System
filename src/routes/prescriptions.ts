import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { auth } from '../middlewares/auth';
import { createPrescription, listPrescriptions, updateStatus } from '../controllers/prescription.controller';

const router = Router();

router.post('/', auth('admin'),
  body('patientId').isString().notEmpty(),
  body('medicationId').isString().notEmpty(),
  body('dosage').isString().notEmpty(),
  body('quantity').isInt({ gt: 0 }),
  createPrescription
);

router.get('/', auth('admin'),
  query('patientId').optional().isString(),
  query('status').optional().isIn(['pending','filled','picked-up']),
  listPrescriptions
);

router.patch('/:id/status', auth('admin'),
  param('id').isString(),
  body('status').isIn(['pending','filled','picked-up']),
  updateStatus
);

export default router;
