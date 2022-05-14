const {
  schemaTask,
  schemaRole,
  schemaUser,
  schemaMember
} = require('../../schema')

const searchMembers = require('./searchMembers')
const getMember = require('./getMember')
const createMember = require('./createMember')
const updateMember = require('./updateMember')
const deleteMember = require('./deleteMember')

module.exports = async function (app) {
  app.log.info('Mount "member"')

  app.get('/searchMembers', {
    schema: {
      description: 'Поиск участников по связям',
      tags: ['member'],
      summary: 'Поиск участников',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          taskId: schemaTask.taskId,
          roleId: schemaRole.roleId,
          userId: schemaUser.userId
        }
      },
      response: {
        200: schemaMember.members
      }
    }
  }, async function (request) {
    app.log.trace('searchMembers')

    const filter = request.query

    return searchMembers(filter, app)
  })

  app.get('/getMember', {
    schema: {
      description: 'Получение участника по идентификатору',
      tags: ['member'],
      summary: 'Получение участника',
      querystring: {
        type: 'object',
        required: ['memberId'],
        additionalProperties: false,
        properties: {
          memberId: schemaMember.memberId
        }
      },
      response: {
        200: schemaMember.member
      }
    }
  }, async function (request) {
    app.log.trace('getMember')

    const { memberId } = request.query

    return getMember(memberId, app)
  })

  app.post('/createMember', {
    schema: {
      description: 'Создание участника',
      tags: ['member'],
      summary: 'Создание участника',
      body: {
        type: 'object',
        required: [
          'memberId',
          'taskId',
          'roleId',
          'userId'
        ],
        additionalProperties: false,
        properties: {
          memberId: schemaMember.memberId,
          taskId: schemaTask.taskId,
          roleId: schemaRole.roleId,
          userId: schemaUser.userId
        }
      },
      response: {
        200: schemaMember.member
      }
    }
  }, async function (request) {
    app.log.trace('createMember')

    const {
      memberId,
      taskId,
      roleId,
      userId
    } = request.body

    return createMember(memberId, taskId, roleId, userId, app)
  })

  app.put('/updateMember', {
    schema: {
      description: 'Изменение участника',
      tags: ['member'],
      summary: 'Изменение участника',
      querystring: {
        type: 'object',
        required: ['memberId'],
        additionalProperties: false,
        properties: {
          memberId: schemaMember.memberId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          memberId: schemaMember.memberId,
          taskId: schemaTask.taskId,
          roleId: schemaRole.roleId,
          userId: schemaUser.userId
        }
      },
      response: {
        200: schemaMember.member
      }
    }
  }, async function (request) {
    app.log.trace('updateMember')

    const { memberId } = request.query
    const memberData = request.body

    return updateMember(memberId, memberData, app)
  })

  app.delete('/deleteMember', {
    schema: {
      description: 'Удаление участника',
      tags: ['member'],
      summary: 'Удаление участника',
      querystring: {
        type: 'object',
        required: ['memberId'],
        additionalProperties: false,
        properties: {
          memberId: schemaMember.memberId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteMember')

    const { memberId } = request.query

    await deleteMember(memberId, app)

    reply.send()
  })
}
