module.exports = async function (userId, { log, knex, httpErrors }) {
  log.debug(`getUser: userId=${userId}`)

  const [user] = await knex('user')
    .where({ userId })
    .select([
      'userId',
      'nickname'
    ])

  if (!user) {
    throw httpErrors.notFound('Пользователь не найден')
  }

  return user
}
