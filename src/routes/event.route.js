/**
 * external libs
 */
import { Router } from 'express';

/**
 * internal middlewares
 */
import HttpValidator from '../handlers/http/middlewares/validator.http.middleware.js';
import CallHttpHandler from '../handlers/http/middlewares/call.http.middleware.js';
import AuthenticateMiddleware from '../handlers/http/middlewares/authenticate.http.middleware.js';

/**
 * internal http handlers
 */
import EventHttpHandler from '../handlers/http/event.http.handler.js';

/**
 * internal validators
 */
import SendEventHttpValidator from '../handlers/http/validators/event/send.validator.js';

const router = Router();

router.post(
	'/send',
	AuthenticateMiddleware,
	HttpValidator(SendEventHttpValidator),
	CallHttpHandler(EventHttpHandler, 'send'),
);

export default router;
