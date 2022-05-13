module.exports = async function (taskId, { log, knex, httpErrors }) {
  log.debug(`deleteTask: taskId=${taskId}`)

  const numberTasksDeleted = await knex('task')
    .where({ taskId })
    .delete()

  if (!numberTasksDeleted) {
    throw httpErrors.notFound('Задача не найдена')
  }
}
