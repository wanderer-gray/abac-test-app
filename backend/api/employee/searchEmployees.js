module.exports = function (filter, app) {
  const { log, knex } = app

  const {
    userId,
    officeId,
    positionId
  } = filter

  log.debug(`searchEmployees: userId=${userId}; officeId=${officeId}; positionId=${positionId}`)

  const query = knex('employee')
    .pluck('employeeId')

  if (userId !== undefined) {
    query.where({ userId })
  }

  if (officeId !== undefined) {
    query.where({ officeId })
  }

  if (positionId !== undefined) {
    query.where({ positionId })
  }

  return query
}
