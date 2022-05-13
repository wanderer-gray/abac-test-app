const getTask = require('./getTask')

module.exports = async function (taskId, taskData, app) {
  const { log, knex } = app

  log.debug(`updateTask: taskId=${taskId}; taskData=${JSON.stringify(taskData)}`)

  await knex('task')
    .where({ taskId })
    .update(taskData)

  return getTask(taskId, app)
}
