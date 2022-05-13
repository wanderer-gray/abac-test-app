const {
  getSalt,
  getHash
} = require('../../password')
const getUser = require('./getUser')

function convertUserData ({ userId, nickname, password }, { log }) {
  const userData = {}

  if (userId !== undefined) {
    userData.userId = userId
  }

  if (nickname !== undefined) {
    userData.nickname = nickname
  }

  if (password !== undefined) {
    const salt = getSalt()

    log.debug(`convertUserData: salt=${salt}`)

    const hash = getHash(password, salt)

    log.debug(`convertUserData: hash=${hash}`)

    userData.salt = salt
    userData.hash = hash
  }

  return userData
}

module.exports = async function (userId, userData, app) {
  const { log, knex } = app

  log.debug(`updateRole: userId=${userId}; userData=${JSON.stringify(userData)}`)

  await knex('user')
    .where({ userId })
    .update(convertUserData(userData, app))

  return getUser(userId, app)
}
