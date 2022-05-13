module.exports = async function (employeeId, { log, knex, httpErrors }) {
  log.debug(`deleteEmployee: employeeId=${employeeId}`)

  const numberEmployeesDeleted = await knex('employee')
    .where({ employeeId })
    .delete()

  if (!numberEmployeesDeleted) {
    throw httpErrors.notFound('Сотрудник не найден')
  }
}
