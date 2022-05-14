const getEmployee = require('./getEmployee')

module.exports = async function (employeeId, userId, officeId, positionId, app) {
  const { log, knex } = app

  log.debug(`createEmployee: employeeId=${employeeId}; userId=${userId}; officeId=${officeId}; positionId=${positionId}`)

  await knex('employee')
    .insert({
      employeeId,
      userId,
      officeId,
      positionId
    })

  return getEmployee(employeeId, app)
}
