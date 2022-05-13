const getPosition = require('./getPosition')

module.exports = async function (positionId, name, app) {
  const { log, knex } = app

  log.debug(`createPosition: positionId=${positionId}; name=${name}`)

  await knex('position')
    .insert({
      positionId,
      name
    })

  return getPosition(positionId, app)
}
