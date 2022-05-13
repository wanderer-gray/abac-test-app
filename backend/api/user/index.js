const { schemaUser } = require('../../schema')

const searchUsers = require('./searchUsers')
const getUser = require('./getUser')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')

module.exports = async function (app) {
  app.log.info('Mount "user"')

  app.get('/searchUsers', {
    schema: {
      description: 'Поиск пользователей по нику',
      tags: ['user'],
      summary: 'Поиск пользователей',
      querystring: {
        type: 'object',
        required: ['nickname'],
        additionalProperties: false,
        properties: {
          nickname: schemaUser.nickname
        }
      },
      response: {
        200: schemaUser.users
      }
    }
  }, async function (request) {
    app.log.trace('searchUsers')

    const { nickname } = request.query

    return searchUsers(nickname, app)
  })

  app.get('/getUser', {
    schema: {
      description: 'Получение пользователя по идентификатору',
      tags: ['user'],
      summary: 'Получение пользователя',
      querystring: {
        type: 'object',
        required: ['userId'],
        additionalProperties: false,
        properties: {
          userId: schemaUser.userId
        }
      },
      response: {
        200: schemaUser.user
      }
    }
  }, async function (request) {
    app.log.trace('getUser')

    const { userId } = request.query

    return getUser(userId, app)
  })

  app.post('/createUser', {
    schema: {
      description: 'Создание пользователя',
      tags: ['user'],
      summary: 'Создание пользователя',
      body: {
        type: 'object',
        required: [
          'userId',
          'nickname',
          'password'
        ],
        additionalProperties: false,
        properties: {
          userId: schemaUser.userId,
          nickname: schemaUser.nickname,
          password: schemaUser.password
        }
      },
      response: {
        200: schemaUser.user
      }
    }
  }, async function (request) {
    app.log.trace('createUser')

    const {
      userId,
      nickname,
      password
    } = request.body

    return createUser(userId, nickname, password, app)
  })

  app.put('/updateUser', {
    schema: {
      description: 'Изменение пользователя',
      tags: ['user'],
      summary: 'Изменение пользователя',
      querystring: {
        type: 'object',
        required: ['userId'],
        additionalProperties: false,
        properties: {
          userId: schemaUser.userId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          userId: schemaUser.userId,
          nickname: schemaUser.nickname,
          password: schemaUser.password
        }
      },
      response: {
        200: schemaUser.user
      }
    }
  }, async function (request) {
    app.log.trace('updateUser')

    const { userId } = request.query
    const userData = request.body

    return updateUser(userId, userData, app)
  })

  app.delete('/deleteUser', {
    schema: {
      description: 'Удаление пользователя',
      tags: ['user'],
      summary: 'Удаление пользователя',
      querystring: {
        type: 'object',
        required: ['userId'],
        additionalProperties: false,
        properties: {
          userId: schemaUser.userId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteUser')

    const { userId } = request.query

    await deleteUser(userId, app)

    reply.send()
  })
}
