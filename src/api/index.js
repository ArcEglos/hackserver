import { version } from '../../package.json';
import { Router } from 'express';
import buzz from './buzz';

export default ({ config, db }) => {
	let api = Router();

	// mount the buzz resource
	api.use('/buzz', buzz({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
