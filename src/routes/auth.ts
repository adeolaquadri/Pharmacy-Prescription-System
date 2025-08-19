import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['admin','user']),
  register
);
router.post('/login',
  body('email').isEmail(),
  body('password').isString(),
  login
);

export default router;
