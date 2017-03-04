import { Router } from 'express';
import requireAuthentication from './requireAuthentication'

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
  routes.all('*', requireAuthentication)

	return routes;
}
