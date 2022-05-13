module.exports = async function (roleId, { log, knex, httpErrors }) {
  log.debug(`getRole: roleId=${roleId}`)

  const role = await knex('role')
    .where({ roleId })
    .first([
      'roleId',
      'name'
    ])

  if (!role) {
    throw httpErrors.notFound('Роль не найдена')
  }

  return role
}
