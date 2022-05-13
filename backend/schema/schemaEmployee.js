const { userId } = require('./schemaUser')
const { officeId } = require('./schemaOffice')
const { positionId } = require('./schemaPosition')

const employeeId = {
  description: 'Идентификатор сотрудника',
  type: 'string',
  format: 'uuid'
}

const employee = {
  description: 'Сотрудник',
  type: 'object',
  required: [
    'employeeId',
    'userId',
    'officeId',
    'positionId'
  ],
  additionalProperties: false,
  properties: {
    employeeId,
    userId,
    officeId,
    positionId
  }
}

const employees = {
  description: 'Сотрудники',
  type: 'array',
  items: employeeId
}

module.exports = {
  employeeId,
  employee,
  employees
}
