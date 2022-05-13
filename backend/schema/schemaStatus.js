const statusId = {
  description: 'Идентификатор статуса',
  type: 'string',
  format: 'uuid'
}

const name = {
  description: 'Название статуса',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'Бесконечность не предел'
}

const status = {
  description: 'Статус',
  type: 'object',
  required: [
    'statusId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    statusId,
    name
  }
}

const statuses = {
  description: 'Статусы',
  type: 'array',
  items: statusId
}

module.exports = {
  statusId,
  name,
  status,
  statuses
}
