/**
 * external libs
 */
import passport from 'passport';

/**
 * internal strategies
 */
import { bearerStrategyHandler } from './passport/bearer.strategy.js';

export default () => {
	passport.use(bearerStrategyHandler());
};
