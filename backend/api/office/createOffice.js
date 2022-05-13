const getOffice = require('./getOffice')

module.exports = async function (officeId, name, app) {
  const { log, knex } = app

  log.debug(`createOffice: officeId=${officeId}; name=${name}`)

  await knex('office')
    .insert({
      officeId,
      name
    })

  return getOffice(officeId, app)
}
