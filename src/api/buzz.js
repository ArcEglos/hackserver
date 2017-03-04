import resource from 'resource-router-middleware';
import Buzz from '../models/buzz';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'buzz',

	/** POST / - Create a new entity */
	create({ body: {message, lifetime} }, res) {
    const expirationDate = new Date().setSeconds(new Date().getSeconds() + lifetime);
    Buzz.create({ message, expirationDate }).then(buzz => {
      res.status(200).send(buzz);
    }, err => {
      console.error(err)
      res.status(500);
    })
	},

	// /** GET /:id - Return a given entity */
	index( { params } , res) {
    Buzz.find().sort({expirationDate: -1}).limit(10).then((buzzes) => {
      res.json(buzzes);
    });
	},
})
