module.exports = async function (officeId, { log, knex, httpErrors }) {
  log.debug(`deleteOffice: officeId=${officeId}`)

  const numberOfficesDeleted = await knex('office')
    .where({ officeId })
    .delete()

  if (!numberOfficesDeleted) {
    throw httpErrors.notFound('Офис не найден')
  }
}
