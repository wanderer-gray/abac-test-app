const getStatus = require('./getStatus')

module.exports = async function (statusId, statusData, app) {
  const { log, knex } = app

  log.debug(`updateStatus: statusId=${statusId}; statusData=${JSON.stringify(statusData)}`)

  await knex('status')
    .where({ statusId })
    .update(statusData)

  return getStatus(statusId, app)
}
