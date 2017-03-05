import resource from 'resource-router-middleware';
import Account from '../models/account';

const actionRewards = {SHARE: 200, ADD_FRIEND: 50, CAP: -200, SHIRT: -1000, MEAL: -5000};

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
  update({params: { account }, body: { actions}}, res) {
    Account.findOne({userId: account}, 'points').then(account => {
      if (account) {
        const newPoints = (account.points || 0) +
          actions.reduce(
            (sum, actionName) => sum + actionRewards[actionName],
            0
          );
        if (newPoints >= 0) {
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
      } else {
        res.status(500);
      }
    });
  },
});
