const { schemaOffice } = require('../../schema')

const searchOffices = require('./searchOffices')
const getOffice = require('./getOffice')
const createOffice = require('./createOffice')
const updateOffice = require('./updateOffice')
const deleteOffice = require('./deleteOffice')

module.exports = async function (app) {
  app.log.info('Mount "office"')

  app.get('/searchOffices', {
    schema: {
      description: 'Поиск офисов по названию',
      tags: ['office'],
      summary: 'Поиск офисов',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaOffice.name
        }
      },
      response: {
        200: schemaOffice.offices
      }
    }
  }, async function (request) {
    app.log.trace('searchOffices')

    const { name } = request.query

    return searchOffices(name, app)
  })

  app.get('/getOffice', {
    schema: {
      description: 'Получение офиса по идентификатору',
      tags: ['office'],
      summary: 'Получение офиса',
      querystring: {
        type: 'object',
        required: ['officeId'],
        additionalProperties: false,
        properties: {
          officeId: schemaOffice.officeId
        }
      },
      response: {
        200: schemaOffice.office
      }
    }
  }, async function (request) {
    app.log.trace('getOffice')

    const { officeId } = request.query

    return getOffice(officeId, app)
  })

  app.post('/createOffice', {
    schema: {
      description: 'Создание офиса',
      tags: ['office'],
      summary: 'Создание офиса',
      body: {
        type: 'object',
        required: [
          'officeId',
          'name'
        ],
        additionalProperties: false,
        properties: {
          officeId: schemaOffice.officeId,
          name: schemaOffice.name
        }
      },
      response: {
        200: schemaOffice.office
      }
    }
  }, async function (request) {
    app.log.trace('createOffice')

    const { officeId, name } = request.body

    return createOffice(officeId, name, app)
  })

  app.put('/updateOffice', {
    schema: {
      description: 'Изменение офиса',
      tags: ['office'],
      summary: 'Изменение офиса',
      querystring: {
        type: 'object',
        required: ['officeId'],
        additionalProperties: false,
        properties: {
          officeId: schemaOffice.officeId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          officeId: schemaOffice.officeId,
          name: schemaOffice.name
        }
      },
      response: {
        200: schemaOffice.office
      }
    }
  }, async function (request) {
    app.log.trace('updateOffice')

    const { officeId } = request.query
    const officeData = request.body

    return updateOffice(officeId, officeData, app)
  })

  app.delete('/deleteOffice', {
    schema: {
      description: 'Удаление офиса',
      tags: ['office'],
      summary: 'Удаление офиса',
      querystring: {
        type: 'object',
        required: ['officeId'],
        additionalProperties: false,
        properties: {
          officeId: schemaOffice.officeId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteOffice')

    const { officeId } = request.query

    await deleteOffice(officeId, app)

    reply.send()
  })
}
