const getOffice = require('./getOffice')

module.exports = async function (officeId, officeData, app) {
  const { log, knex } = app

  log.debug(`updateOffice: officeId=${officeId}; officeData=${JSON.stringify(officeData)}`)

  await knex('office')
    .where({ officeId })
    .update(officeData)

  return getOffice(officeId, app)
}
