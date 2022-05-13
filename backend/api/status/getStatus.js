module.exports = async function (statusId, { log, knex, httpErrors }) {
  log.debug(`getStatus: statusId=${statusId}`)

  const status = await knex('status')
    .where({ statusId })
    .first([
      'statusId',
      'name'
    ])

  if (!status) {
    throw httpErrors.notFound('Статус не найден')
  }

  return status
}
