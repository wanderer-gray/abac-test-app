const { schemaUser } = require('../../schema')

const logIn = require('./logIn')
const logOut = require('./logOut')

module.exports = async function (app) {
  app.log.info('Mount "authentication"')

  app.get('/checkAuth', {
    schema: {
      description: 'Проверка аутентификации',
      tags: ['authentication'],
      summary: 'Проверка аутентификации',
      response: {
        200: {
          description: 'Аутентифицирован ли пользователь',
          type: 'boolean'
        }
      }
    }
  }, async function (request) {
    app.log.trace('checkAuth')

    const { userId } = request

    return !!userId
  })

  app.post('/logIn', {
    schema: {
      description: 'Войти в систему по нику и паролю',
      tags: ['authentication'],
      summary: 'Войти в систему',
      body: {
        type: 'object',
        required: [
          'nickname',
          'password'
        ],
        additionalProperties: false,
        properties: {
          nickname: schemaUser.nickname,
          password: schemaUser.password
        }
      },
      response: {
        200: schemaUser.userId
      }
    }
  }, async function (request, reply) {
    app.log.trace('logIn')

    const {
      nickname,
      password
    } = request.body

    const userId = await logIn(nickname, password, app)

    reply
      .setCookie('userId', userId, {
        path: '/',
        httpOnly: true,
        signed: 'true'
      })
      .send(userId)
  })

  app.delete('/logOut', {
    schema: {
      description: 'Выйти из системы',
      tags: ['authentication'],
      summary: 'Выйти из системы',
      response: {
        200: schemaUser.userId
      }
    }
  }, async function (request, reply) {
    app.log.trace('logOut')

    const { userId } = request

    await logOut(userId, app)

    reply
      .clearCookie('userId')
      .send(userId)
  })
}
