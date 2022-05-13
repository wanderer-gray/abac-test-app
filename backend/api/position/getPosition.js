module.exports = async function (positionId, { log, knex, httpErrors }) {
  log.debug(`getPosition: positionId=${positionId}`)

  const position = await knex('position')
    .where({ positionId })
    .first([
      'positionId',
      'name'
    ])

  if (!position) {
    throw httpErrors.notFound('Должность не найдена')
  }

  return position
}
