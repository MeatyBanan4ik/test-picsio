/**
 * external libs
 */
import { Router } from 'express';

/**
 * internal routes
 */
import AuthRoute from './auth.route.js';
import EventRoute from './event.route.js';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/events', EventRoute);

export default router;
