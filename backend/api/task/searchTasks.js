module.exports = function (title, app) {
  const { log, knex } = app

  log.debug(`searchTasks: title=${title}`)

  return knex('task')
    .where('title', 'like', `%${title}%`)
    .pluck('taskId')
}
