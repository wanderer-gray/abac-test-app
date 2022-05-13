const { status } = require('./schemaStatus')
const { members } = require('./schemaMember')

const taskId = {
  description: 'Идентификатор задачи',
  type: 'string',
  format: 'uuid'
}

const title = {
  description: 'Название задачи',
  type: 'string',
  maxLength: 255,
  example: '— Это вам не это. (Дикий прапор)'
}

const createdAt = {
  description: 'Дата создания задачи',
  type: 'string',
  format: 'date-time'
}

const task = {
  description: 'Задача',
  type: 'object',
  required: [
    'taskId',
    'title',
    'createdAt',
    'status',
    'members'
  ],
  additionalProperties: false,
  properties: {
    taskId,
    title,
    createdAt,
    status,
    members
  }
}

const tasks = {
  description: 'Задачи',
  type: 'array',
  items: taskId
}

module.exports = {
  taskId,
  title,
  createdAt,
  task,
  tasks
}
