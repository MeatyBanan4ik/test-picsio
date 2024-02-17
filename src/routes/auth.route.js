/**
 * external libs
 */
import { Router } from 'express';

/**
 * internal http handlers
 */
import AuthHttpHandler from '../handlers/http/auth.http.handler.js';

/**
 * internal middlewares
 */
import HttpValidator from '../handlers/http/middlewares/validator.http.middleware.js';
import callHttpMiddleware from '../handlers/http/middlewares/call.http.middleware.js';

/**
 * internal validators
 */
import LoginHttpValidator from '../handlers/http/validators/auth/login.validator.js';
import RefreshHttValidator from '../handlers/http/validators/auth/refresh.validator.js';
import RegisterHttValidator from '../handlers/http/validators/auth/register.validator.js';

const router = Router();

router.post('/login', HttpValidator(LoginHttpValidator), callHttpMiddleware(AuthHttpHandler, 'login'));
router.post('/register', HttpValidator(RegisterHttValidator), callHttpMiddleware(AuthHttpHandler, 'register'));
router.post('/token/refresh', HttpValidator(RefreshHttValidator), callHttpMiddleware(AuthHttpHandler, 'refresh'));

export default router;
