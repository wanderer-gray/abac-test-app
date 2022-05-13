module.exports = async function (userId, { log, knex, httpErrors }) {
  log.debug(`deleteUser: userId=${userId}`)

  const numberUsersDeleted = await knex('user')
    .where({ userId })
    .delete()

  if (!numberUsersDeleted) {
    throw httpErrors.notFound('Пользователь не найден')
  }
}
