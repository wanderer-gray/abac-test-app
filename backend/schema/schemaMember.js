const { roleId } = require('./schemaRole')
const { userId } = require('./schemaUser')

const memberId = {
  description: 'Идентификатор участника',
  type: 'string',
  format: 'uuid'
}

const member = {
  description: 'Участник',
  type: 'object',
  required: [
    'memberId',
    'roleId',
    'userId'
  ],
  additionalProperties: false,
  properties: {
    memberId,
    roleId,
    userId
  }
}

const members = {
  description: 'Сотрудники',
  type: 'array',
  items: memberId
}

module.exports = {
  memberId,
  member,
  members
}
