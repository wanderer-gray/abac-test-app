const positionId = {
  description: 'Идентификатор должности',
  type: 'string',
  format: 'uuid'
}

const name = {
  description: 'Название должности',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'Безработный музыкант'
}

const position = {
  description: 'Должность',
  type: 'object',
  required: [
    'positionId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    positionId,
    name
  }
}

const positions = {
  description: 'Должности',
  type: 'array',
  items: positionId
}

module.exports = {
  positionId,
  name,
  position,
  positions
}
