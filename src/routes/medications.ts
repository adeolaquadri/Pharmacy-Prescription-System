import { Router } from 'express';
import { body } from 'express-validator';
import { createMedication, lowStock, updateMedication } from '../controllers/medication.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/', auth('admin'),
  body('name').isString().notEmpty(),
  body('stock').isInt({ min: 0 }),
  body('unitPrice').isFloat({ gt: 0 }),
  createMedication
);

router.get('/low-stock', auth('admin'), lowStock);
router.patch('/:id', auth('admin'),
  body('stock').optional().isInt({ min: 0 }),
  body('unitPrice').optional().isFloat({ gt: 0 }),
  updateMedication
);

export default router;
