module.exports = async function (statusId, { log, knex, httpErrors }) {
  log.debug(`deleteStatus: statusId=${statusId}`)

  const numberStatusesDeleted = await knex('status')
    .where({ statusId })
    .delete()

  if (!numberStatusesDeleted) {
    throw httpErrors.notFound('Статус не найден')
  }
}
