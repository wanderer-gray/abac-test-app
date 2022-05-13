const getEmployee = require('./getEmployee')

module.exports = async function (employeeId, employeeData, app) {
  const { log, knex } = app

  log.debug(`updateEmployee: employeeId=${employeeId}; employeeData=${JSON.stringify(employeeData)}`)

  await knex('employee')
    .where({ employeeId })
    .update(employeeData)

  return getEmployee(employeeId, app)
}
