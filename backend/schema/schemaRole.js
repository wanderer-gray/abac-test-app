const roleId = {
  description: 'Идентификатор роли',
  type: 'string',
  format: 'uuid'
}

const name = {
  description: 'Название роли',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'Может всё'
}

const role = {
  description: 'Роль',
  type: 'object',
  required: [
    'roleId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    roleId,
    name
  }
}

const roles = {
  description: 'Роли',
  type: 'array',
  items: roleId
}

module.exports = {
  roleId,
  name,
  role,
  roles
}
