const {
  getSalt,
  getHash
} = require('../../password')
const getUser = require('./getUser')

module.exports = async function (userId, nickname, password, app) {
  const { log, knex } = app

  log.debug(`createUser: userId=${userId}; nickname=${nickname}; password=${password}`)

  const salt = getSalt()

  log.debug(`createUser: salt=${salt}`)

  const hash = getHash(password, salt)

  log.debug(`createUser: hash=${hash}`)

  await knex('user')
    .insert({
      userId,
      nickname,
      salt,
      hash
    })

  return getUser(userId, app)
}
