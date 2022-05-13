module.exports = function (name, { log, knex }) {
  log.debug(`searchPositions: name=${name}`)

  return knex('position')
    .where('name', 'like', `%${name}%`)
    .pluck('positionId')
}
