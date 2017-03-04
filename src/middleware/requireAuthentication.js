import FB from 'fb'
import Account from '../models/account'

const deny = res => res.status(401).end()
const verify = ({password}) => {
  const options = {
    fields: ['id', 'name'],
    access_token: password
  }

  return new Promise((resolve, reject) => {
    FB.api('me', options, res => {
      if (!res || !res.error) return reject(res ? res.error : 'no response')
      resolve(res)
    })
  })
}

export default function requireAuthentication (req, res, next) {
  return next()

  let credentials = req.authorization.basic
  if (!credentials) {
    return deny(res)
  }

  Account.findOne({userId: credentials.username})
  .then(account => {
    if (!account) {
      return verify(credentials).then(profile => {
        console.log("received", profile)
        return Account.create({
          userId: profile.id,
          accessToken: credentials.password
        })
        .then(account => {
          req.account = account
          next()
        })
      })
    } else {
      req.account = account
      next()
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).end()
  })
}
