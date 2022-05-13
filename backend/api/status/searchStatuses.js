module.exports = function (name, { log, knex }) {
  log.debug(`searchStatuses: name=${name}`)

  return knex('status')
    .where('name', 'like', `%${name}%`)
    .pluck('statusId')
}
