const {
  schemaStatus,
  schemaTask
} = require('../../schema')

const searchTasks = require('./searchTasks')
const getTask = require('./getTask')
const createTask = require('./createTask')
const updateTask = require('./updateTask')
const deleteTask = require('./deleteTask')

module.exports = async function (app) {
  app.log.info('Mount "task"')

  app.get('/searchTasks', {
    schema: {
      description: 'Поиск задач по названию',
      tags: ['task'],
      summary: 'Поиск задач',
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          title: schemaTask.title
        }
      },
      response: {
        200: schemaTask.tasks
      }
    }
  }, async function (request) {
    app.log.trace('searchTasks')

    const { title } = request.query

    return searchTasks(title, app)
  })

  app.get('/getTask', {
    schema: {
      description: 'Получение задачи по идентификатору',
      tags: ['task'],
      summary: 'Получение задачи',
      querystring: {
        type: 'object',
        required: ['taskId'],
        additionalProperties: false,
        properties: {
          taskId: schemaTask.taskId
        }
      },
      response: {
        200: schemaTask.task
      }
    }
  }, async function (request) {
    app.log.trace('getTask')

    const { taskId } = request.query

    return getTask(taskId, app)
  })

  app.post('/createTask', {
    schema: {
      description: 'Создание задачи',
      tags: ['task'],
      summary: 'Создание задачи',
      body: {
        type: 'object',
        required: [
          'taskId',
          'title'
        ],
        additionalProperties: false,
        properties: {
          taskId: schemaTask.taskId,
          title: schemaTask.title,
          statusId: schemaStatus.statusId
        }
      },
      response: {
        200: schemaTask.task
      }
    }
  }, async function (request) {
    app.log.trace('createTask')

    const {
      taskId,
      title,
      statusId
    } = request.body

    return createTask(taskId, title, statusId, app)
  })

  app.put('/updateTask', {
    schema: {
      description: 'Изменение задачи',
      tags: ['task'],
      summary: 'Изменение задачи',
      querystring: {
        type: 'object',
        required: ['taskId'],
        additionalProperties: false,
        properties: {
          taskId: schemaTask.taskId
        }
      },
      body: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          taskId: schemaTask.taskId,
          title: schemaTask.title,
          statusId: schemaStatus.statusId
        }
      },
      response: {
        200: schemaTask.task
      }
    }
  }, async function (request) {
    app.log.trace('updateTask')

    const { taskId } = request.query
    const taskData = request.body

    return updateTask(taskId, taskData, app)
  })

  app.delete('/deleteTask', {
    schema: {
      description: 'Удаление задачи',
      tags: ['task'],
      summary: 'Удаление задачи',
      querystring: {
        type: 'object',
        required: ['taskId'],
        additionalProperties: false,
        properties: {
          taskId: schemaTask.taskId
        }
      }
    }
  }, async function (request, reply) {
    app.log.trace('deleteTask')

    const { taskId } = request.body

    await deleteTask(taskId, app)

    reply.send()
  })
}
