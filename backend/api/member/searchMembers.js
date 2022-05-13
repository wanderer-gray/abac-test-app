module.exports = function (filter, app) {
  const { log, knex } = app

  const {
    taskId,
    roleId,
    userId
  } = filter

  log.debug(`searchMembers: taskId=${taskId}; roleId=${roleId}; userId=${userId}`)

  const query = knex('member')
    .pluck('memberId')

  if (taskId !== undefined) {
    query.where({ taskId })
  }

  if (roleId !== undefined) {
    query.where({ roleId })
  }

  if (userId !== undefined) {
    query.where({ userId })
  }

  return query
}
