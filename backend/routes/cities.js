import { Router } from 'express';
import { getAll } from '../controllers/cities.js';

const router = new Router();

router.get('/', getAll);

export default router;
