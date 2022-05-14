const { schemaRole } = require('../../schema')

const searchRoles = require('./searchRoles')
const getRole = require('./getRole')
const createRole = require('./createRole')
const updateRole = require('./updateRole')
const deleteRole = require('./deleteRole')

module.exports = async function (app) {
  app.log.info('Mount "role"')

  app.get('/searchRoles', {
    schema: {
      description: 'Поиск ролей по названию',
      tags: ['role'],
      summary: 'Поиск ролей',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: schemaRole.name
        }
      },
      response: {
        200: schemaRole.roles
      }
    }
  }, async function (request) {
    app.log.trace('searchRoles')

    const { name } = request.query

    return searchRoles(name, app)
  })

  app.get('/getRole', {
    schema: {
      description: 'Получение роли по идентификатору',
      tags: ['role'],
      summary: 'Получение роли',
      querystring: {
        type: 'object',
        required: ['roleId'],
        additionalProperties: false,
        properties: {
          roleId: schemaRole.roleId
        }
      },
      response: {
        200: schemaRole.role
      }
    }
  }, async function (request) {
    app.log.trace('getRole')

    const { roleId } = request.query

    return getRole(roleId, app)
  })

  app.post('/createRole', {
    schema: {
      description: 'Создание роли',
      tags: ['role'],
      summary: 'Создание роли',
      body: {
        type: 'object',
        required: [
          'roleId',
          'name'
        ],
        additionalProperties: false,
        properties: {
          roleId: schemaRole.roleId,
          name: schemaRole.name
        }
      },
      response: {
        200: schemaRole.role
      }
    }
  }, async function (request) {
    app.log.trace('createRole')

    const {
      roleId,
      name
    } = request.body

    return createRole(roleId, name, app)
  })

  app.put('/updateRole', {
    schema: {
      description: 'Изменение роли',
      tags: ['role'],
      summary: 'Изменение роли',
      querystring: {
        type: 'object',
        required: ['roleId'],
        additionalProperties: false,
        properties: {
          roleId: schemaRole.roleId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          roleId: schemaRole.roleId,
          name: schemaRole.name
        }
      },
      response: {
        200: schemaRole.role
      }
    }
  }, async function (request) {
    app.log.trace('updateRole')

    const { roleId } = request.query
    const roleData = request.body

    return updateRole(roleId, roleData, app)
  })

  app.delete('/deleteRole', {
    schema: {
      description: 'Удаление роли',
      tags: ['role'],
      summary: 'Удаление роли',
      querystring: {
        type: 'object',
        required: ['roleId'],
        additionalProperties: false,
        properties: {
          roleId: schemaRole.roleId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteRole')

    const { roleId } = request.query

    await deleteRole(roleId, app)

    reply.send()
  })
}
