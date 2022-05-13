module.exports = async function (roleId, { log, knex, httpErrors }) {
  log.debug(`deleteRole: roleId=${roleId}`)

  const numberRolesDeleted = await knex('role')
    .where({ roleId })
    .delete()

  if (!numberRolesDeleted) {
    throw httpErrors.notFound('Роль не найдена')
  }
}
