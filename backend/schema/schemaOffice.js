const officeId = {
  description: 'Идентификатор офиса',
  type: 'string',
  format: 'uuid'
}

const name = {
  description: 'Название офиса',
  type: 'string',
  maxLength: 255,
  default: '',
  example: 'ООО "РОГА И КОПЫТА"'
}

const office = {
  description: 'Офис',
  type: 'object',
  required: [
    'officeId',
    'name'
  ],
  additionalProperties: false,
  properties: {
    officeId,
    name
  }
}

const offices = {
  description: 'Офисы',
  type: 'array',
  items: officeId
}

module.exports = {
  officeId,
  name,
  office,
  offices
}
