const { getDateTimeISO } = require('../../datetime')

const getTask = require('./getTask')

module.exports = async function (taskId, title, statusId, app) {
  const { log, knex } = app

  log.debug(`createTask: taskId=${taskId}; title=${title}; statusId=${statusId}`)

  await knex('task')
    .insert({
      taskId,
      title,
      createdAt: getDateTimeISO(),
      statusId
    })

  return getTask(taskId, app)
}
