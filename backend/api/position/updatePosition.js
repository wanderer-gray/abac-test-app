const getPosition = require('./getPosition')

module.exports = async function (positionId, positionData, app) {
  const { log, knex } = app

  log.debug(`updatePosition: positionId=${positionId}; positionData=${JSON.stringify(positionData)}`)

  await knex('position')
    .where({ positionId })
    .update(positionData)

  return getPosition(positionId, app)
}
