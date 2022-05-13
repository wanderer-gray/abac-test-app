module.exports = function (name, { log, knex }) {
  log.debug(`searchOffices: name=${name}`)

  return knex('office')
    .where('name', 'like', `%${name}%`)
    .pluck('officeId')
}
