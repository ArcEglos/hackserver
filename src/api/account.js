import resource from 'resource-router-middleware';
import Account from '../models/account';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'account',

	/** POST / - Create a new entity */
	create({ body: {userId, accessToken} }, res) {
    Account.findOne({userId}).then(account => {
      if (account) return account.update({accessToken})
      return Account.create({userId, accessToken})
    })
    .then(account => {
      res.status(200).send(account)
    }, err => {
      console.error(err)
      res.status(500)
    })
	}
})
