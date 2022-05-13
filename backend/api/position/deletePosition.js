module.exports = async function (positionId, { log, knex, httpErrors }) {
  log.debug(`deletePosition: positionId=${positionId}`)

  const numberPositionsDeleted = await knex('position')
    .where({ positionId })
    .delete()

  if (!numberPositionsDeleted) {
    throw httpErrors.notFound('Должность не найдена')
  }
}
