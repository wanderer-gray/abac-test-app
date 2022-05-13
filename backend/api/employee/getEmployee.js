module.exports = async function (employeeId, app) {
  const { log, knex, httpErrors } = app

  log.debug(`getEmployee: employeeId=${employeeId}`)

  const employee = await knex('employee')
    .where({ employeeId })
    .first([
      'employeeId',
      'userId',
      'officeId',
      'positionId'
    ])

  if (!employee) {
    throw httpErrors.notFound('Сотрудник не найден')
  }

  return employee
}
