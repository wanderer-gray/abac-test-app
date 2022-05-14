const {
  schemaUser,
  schemaOffice,
  schemaPosition,
  schemaEmployee
} = require('../../schema')

const searchEmployees = require('./searchEmployees')
const getEmployee = require('./getEmployee')
const createEmployee = require('./createEmployee')
const updateEmployee = require('./updateEmployee')
const deleteEmployee = require('./deleteEmployee')

module.exports = async function (app) {
  app.log.info('Mount "employee"')

  app.get('/searchEmployees', {
    schema: {
      description: 'Поиск сотрудников по связям',
      tags: ['employee'],
      summary: 'Поиск сотрудников',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          userId: schemaUser.userId,
          officeId: schemaOffice.officeId,
          positionId: schemaPosition.positionId
        }
      },
      response: {
        200: schemaEmployee.employees
      }
    }
  }, async function (request) {
    app.log.trace('searchEmployees')

    const filter = request.query

    return searchEmployees(filter, app)
  })

  app.get('/getEmployee', {
    schema: {
      description: 'Получение сотрудника по идентификатору',
      tags: ['employee'],
      summary: 'Получение сотрудника',
      querystring: {
        type: 'object',
        required: ['employeeId'],
        additionalProperties: false,
        properties: {
          employeeId: schemaEmployee.employeeId
        }
      },
      response: {
        200: schemaEmployee.employee
      }
    }
  }, async function (request) {
    app.log.trace('getEmployee')

    const { employeeId } = request.query

    return getEmployee(employeeId, app)
  })

  app.post('/createEmployee', {
    schema: {
      description: 'Создание сотрудника',
      tags: ['employee'],
      summary: 'Создание сотрудника',
      body: {
        type: 'object',
        required: [
          'employeeId',
          'userId',
          'officeId',
          'positionId'
        ],
        additionalProperties: false,
        properties: {
          employeeId: schemaEmployee.employeeId,
          userId: schemaUser.userId,
          officeId: schemaOffice.officeId,
          positionId: schemaPosition.positionId
        }
      },
      response: {
        200: schemaEmployee.employee
      }
    }
  }, async function (request) {
    app.log.trace('createEmployee')

    const {
      employeeId,
      userId,
      officeId,
      positionId
    } = request.body

    return createEmployee(employeeId, userId, officeId, positionId, app)
  })

  app.put('/updateEmployee', {
    schema: {
      description: 'Изменение сотрудника',
      tags: ['employee'],
      summary: 'Изменение сотрудника',
      querystring: {
        type: 'object',
        required: ['employeeId'],
        additionalProperties: false,
        properties: {
          employeeId: schemaEmployee.employeeId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          employeeId: schemaEmployee.employeeId,
          userId: schemaUser.userId,
          officeId: schemaOffice.officeId,
          positionId: schemaPosition.positionId
        }
      },
      response: {
        200: schemaEmployee.employee
      }
    }
  }, async function (request) {
    app.log.trace('updateEmployee')

    const { employeeId } = request.query
    const employeeData = request.body

    return updateEmployee(employeeId, employeeData, app)
  })

  app.delete('/deleteEmployee', {
    schema: {
      description: 'Удаление сотрудника',
      tags: ['employee'],
      summary: 'Удаление сотрудника',
      querystring: {
        type: 'object',
        required: ['employeeId'],
        additionalProperties: false,
        properties: {
          employeeId: schemaEmployee.employeeId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteEmployee')

    const { employeeId } = request.query

    await deleteEmployee(employeeId, app)

    reply.send()
  })
}
