const getRole = require('./getRole')

module.exports = async function (roleId, name, app) {
  const { log, knex } = app

  log.debug(`createRole: roleId=${roleId}; name=${name}`)

  await knex('role')
    .insert({
      roleId,
      name
    })

  return getRole(roleId, app)
}
