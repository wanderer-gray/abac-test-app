module.exports = async function (officeId, { log, knex, httpErrors }) {
  log.debug(`getOffice: officeId=${officeId}`)

  const office = await knex('office')
    .where({ officeId })
    .first([
      'officeId',
      'name'
    ])

  if (!office) {
    throw httpErrors.notFound('Офис не найден')
  }

  return office
}
