module.exports = async function (taskId, app) {
  const { log, knex, httpErrors } = app

  log.debug(`getTask: taskId=${taskId}`)

  const task = await knex('task')
    .where({ taskId })
    .first([
      'taskId',
      'title',
      'createdAt',
      'statusId'
    ])

  if (!task) {
    throw httpErrors.notFound('Задача не найдена')
  }

  return task
}
