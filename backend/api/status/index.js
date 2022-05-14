const { schemaStatus } = require('../../schema')

const searchStatuses = require('./searchStatuses')
const getStatus = require('./getStatus')
const createStatus = require('./createStatus')
const updateStatus = require('./updateStatus')
const deleteStatus = require('./deleteStatus')

module.exports = async function (app) {
  app.log.info('Mount "status"')

  app.get('/searchStatuses', {
    schema: {
      description: 'Поиск статусов по названию',
      tags: ['status'],
      summary: 'Поиск статусов',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaStatus.name
        }
      },
      response: {
        200: schemaStatus.statuses
      }
    }
  }, async function (request) {
    app.log.trace('searchStatuses')

    const { name } = request.query

    return searchStatuses(name, app)
  })

  app.get('/getStatus', {
    schema: {
      description: 'Получение статуса по идентификатору',
      tags: ['status'],
      summary: 'Получение статуса',
      querystring: {
        type: 'object',
        required: ['statusId'],
        additionalProperties: false,
        properties: {
          statusId: schemaStatus.statusId
        }
      },
      response: {
        200: schemaStatus.status
      }
    }
  }, async function (request) {
    app.log.trace('getStatus')

    const { statusId } = request.query

    return getStatus(statusId, app)
  })

  app.post('/createStatus', {
    schema: {
      description: 'Создание статуса',
      tags: ['status'],
      summary: 'Создание статуса',
      body: {
        type: 'object',
        required: [
          'statusId',
          'name'
        ],
        additionalProperties: false,
        properties: {
          statusId: schemaStatus.statusId,
          name: schemaStatus.name
        }
      },
      response: {
        200: schemaStatus.status
      }
    }
  }, async function (request) {
    app.log.trace('createStatus')

    const {
      statusId,
      name
    } = request.body

    return createStatus(statusId, name, app)
  })

  app.put('/updateStatus', {
    schema: {
      description: 'Изменение статуса',
      tags: ['status'],
      summary: 'Изменение статуса',
      querystring: {
        type: 'object',
        required: ['statusId'],
        additionalProperties: false,
        properties: {
          statusId: schemaStatus.statusId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          statusId: schemaStatus.statusId,
          name: schemaStatus.name
        }
      },
      response: {
        200: schemaStatus.status
      }
    }
  }, async function (request) {
    app.log.trace('updateStatus')

    const { statusId } = request.query
    const statusData = request.body

    return updateStatus(statusId, statusData, app)
  })

  app.delete('/deleteStatus', {
    schema: {
      description: 'Удаление статуса',
      tags: ['status'],
      summary: 'Удаление статуса',
      querystring: {
        type: 'object',
        required: ['statusId'],
        additionalProperties: false,
        properties: {
          statusId: schemaStatus.statusId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteStatus')

    const { statusId } = request.query

    await deleteStatus(statusId, app)

    reply.send()
  })
}
