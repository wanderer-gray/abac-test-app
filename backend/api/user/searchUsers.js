module.exports = function (nickname, { log, knex }) {
  log.debug(`searchUsers: nickname=${nickname}`)

  return knex('user')
    .where('nickname', 'like', `%${nickname}%`)
    .pluck('userId')
}
