module.exports = function (name, { log, knex }) {
  log.debug(`searchRoles: name=${name}`)

  return knex('role')
    .where('name', 'like', `%${name}%`)
    .pluck('roleId')
}
