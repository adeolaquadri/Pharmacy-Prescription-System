import { Router } from 'express';
import { body, query } from 'express-validator';
import { createPatient, getPatients, getPatient, searchPatients } from '../controllers/patient.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/', auth('admin'),
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').isString().notEmpty(),
  body('dateOfBirth').isISO8601(),
  createPatient
);

router.get('/', auth('admin'), getPatients);
router.get('/search', auth('admin'), query('q').isString().notEmpty(), searchPatients);
router.get('/:id', auth('admin'), getPatient);

export default router;
