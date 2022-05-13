const getStatus = require('./getStatus')

module.exports = async function (statusId, name, app) {
  const { log, knex } = app

  log.debug(`createStatus: statusId=${statusId}; name=${name}`)

  await knex('status')
    .insert({
      statusId,
      name
    })

  return getStatus(statusId, app)
}
