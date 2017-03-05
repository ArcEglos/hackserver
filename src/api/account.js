import resource from 'resource-router-middleware';
import Account from '../models/account';

const actionRewards = {SHARE: 200, ADD_FRIEND: 50};

export default ({config, db}) => resource({
  /** Property name to store preloaded entity on `request`. */
  id: 'account',
  /** POST / - Create a new entity */
  create({body: {userId, accessToken}}, res) {
    Account
      .findOne({userId})
      .then(account => {
        if (account) return account.update({accessToken});
        return Account.create({userId, accessToken, points: 0});
      })
      .then(
        account => {
          res.status(200).send(account);
        },
        err => {
          console.error(err);
          res.status(500);
        }
      );
  },
  update({body: {userId, actions}}, res) {
    Account.findOne({userId}).then(account => {
      if (account) {
        const newPoints = account.points +
          actions.reduce(
            (sum, actionName) => sum + actionRewards[actionName],
            0
          );
        account
          .update({points: newPoints})
          .then(() => {
            res.status(200).send({newPoints});
          })
          .catch(() => {
            res.status(500);
          });
      } else {
        res.status(500);
      }
    });
  },
});
