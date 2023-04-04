import { Router } from 'express';
import { getAll } from '../controllers/citizens.js';

const router = new Router();

router.get('/', getAll);

export default router;
