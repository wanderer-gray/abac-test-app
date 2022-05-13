const getRole = require('./getRole')

module.exports = async function (roleId, roleData, app) {
  const { log, knex } = app

  log.debug(`updateRole: roleId=${roleId}; roleData=${JSON.stringify(roleData)}`)

  await knex('role')
    .where({ roleId })
    .update(roleData)

  return getRole(roleId, app)
}
