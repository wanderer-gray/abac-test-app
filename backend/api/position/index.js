const { schemaPosition } = require('../../schema')

const searchPositions = require('./searchPositions')
const getPosition = require('./getPosition')
const createPosition = require('./createPosition')
const updatePosition = require('./updatePosition')
const deletePosition = require('./deletePosition')

module.exports = async function (app) {
  app.log.info('Mount "position"')

  app.get('/searchPositions', {
    schema: {
      description: 'Поиск должностей по названию',
      tags: ['position'],
      summary: 'Поиск должностей',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaPosition.name
        }
      },
      response: {
        200: schemaPosition.positions
      }
    }
  }, async function (request) {
    app.log.trace('searchPositions')

    const { name } = request.query

    return searchPositions(name, app)
  })

  app.get('/getPosition', {
    schema: {
      description: 'Получение должности по идентификатору',
      tags: ['position'],
      summary: 'Получение должности',
      querystring: {
        type: 'object',
        required: ['positionId'],
        additionalProperties: false,
        properties: {
          positionId: schemaPosition.positionId
        }
      },
      response: {
        200: schemaPosition.position
      }
    }
  }, async function (request) {
    app.log.trace('getPosition')

    const { positionId } = request.query

    return getPosition(positionId, app)
  })

  app.post('/createPosition', {
    schema: {
      description: 'Создание должности',
      tags: ['position'],
      summary: 'Создание должности',
      body: {
        type: 'object',
        required: ['positionId', 'name'],
        additionalProperties: false,
        properties: {
          positionId: schemaPosition.positionId,
          name: schemaPosition.name
        }
      },
      response: {
        200: schemaPosition.position
      }
    }
  }, async function (request) {
    app.log.trace('createPosition')

    const { positionId, name } = request.body

    return createPosition(positionId, name, app)
  })

  app.put('/updatePosition', {
    schema: {
      description: 'Изменение должности',
      tags: ['position'],
      summary: 'Изменение должности',
      querystring: {
        type: 'object',
        required: ['positionId'],
        additionalProperties: false,
        properties: {
          positionId: schemaPosition.positionId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          positionId: schemaPosition.positionId,
          name: schemaPosition.name
        }
      },
      response: {
        200: schemaPosition.position
      }
    }
  }, async function (request) {
    app.log.trace('updatePosition')

    const { positionId } = request.query
    const positionData = request.body

    return updatePosition(positionId, positionData, app)
  })

  app.delete('/deletePosition', {
    schema: {
      description: 'Удаление должности',
      tags: ['position'],
      summary: 'Удаление должности',
      querystring: {
        type: 'object',
        required: ['positionId'],
        additionalProperties: false,
        properties: {
          positionId: schemaPosition.positionId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deletePosition')

    const { positionId } = request.body

    await deletePosition(positionId, app)

    reply.send()
  })
}
