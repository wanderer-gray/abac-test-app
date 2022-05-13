/* eslint-disable camelcase */

const uuid = require('../uuid')
const {
  getSalt,
  getHash
} = require('../password')

const admin_abc = uuid()
const custom_abc = uuid()
const support_abc = uuid()

const admin_123 = uuid()
const custom_123 = uuid()
const support_123 = uuid()

const users = [
  {
    userId: admin_abc,
    nickname: 'admin_abc',
    password: '123456'
  },
  {
    userId: custom_abc,
    nickname: 'custom_abc',
    password: '123456'
  },
  {
    userId: support_abc,
    nickname: 'support_abc',
    password: '123456'
  },
  {
    userId: admin_123,
    nickname: 'admin_123',
    password: '123456'
  },
  {
    userId: custom_123,
    nickname: 'custom_123',
    password: '123456'
  },
  {
    userId: support_123,
    nickname: 'support_123',
    password: '123456'
  }
]

const office_abc = uuid()
const office_123 = uuid()

const offices = [
  {
    officeId: office_abc,
    name: 'ООО "ABC"'
  },
  {
    officeId: office_123,
    name: 'ООО "123"'
  }
]

const position_admin = uuid()
const position_custom = uuid()
const position_support = uuid()

const positions = [
  {
    positionId: position_admin,
    name: 'Администратор'
  },
  {
    positionId: position_custom,
    name: 'Специалист по наладке'
  },
  {
    positionId: position_support,
    name: 'Специалист поддержки'
  }
]

const employees = [
  {
    employeeId: uuid(),
    userId: admin_abc,
    officeId: office_abc,
    positionId: position_admin
  },
  {
    employeeId: uuid(),
    userId: custom_abc,
    officeId: office_abc,
    positionId: position_custom
  },
  {
    employeeId: uuid(),
    userId: support_abc,
    officeId: office_abc,
    positionId: position_support
  },
  {
    employeeId: uuid(),
    userId: admin_123,
    officeId: office_123,
    positionId: position_admin
  },
  {
    employeeId: uuid(),
    userId: custom_123,
    officeId: office_123,
    positionId: position_custom
  },
  {
    employeeId: uuid(),
    userId: support_123,
    officeId: office_123,
    positionId: position_support
  }
]

const statuses = [
  {
    statusId: uuid(),
    name: 'На выполнение'
  },
  {
    statusId: uuid(),
    name: 'На отмену'
  },
  {
    statusId: uuid(),
    name: 'В процессе'
  },
  {
    statusId: uuid(),
    name: 'Приостановлено'
  },
  {
    statusId: uuid(),
    name: 'На проверку'
  },
  {
    statusId: uuid(),
    name: 'Проверено'
  },
  {
    statusId: uuid(),
    name: 'На доработку'
  }
]

const roles = [
  {
    roleId: uuid(),
    name: 'Создатель'
  },
  {
    roleId: uuid(),
    name: 'Исполнитель'
  },
  {
    roleId: uuid(),
    name: 'Контролёр'
  }
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex('user')
    .insert(users.map(({ userId, nickname, password }) => {
      const salt = getSalt()
      const hash = getHash(password, salt)

      return {
        userId,
        nickname,
        salt,
        hash
      }
    }))

  await knex('office')
    .insert(offices)

  await knex('position')
    .insert(positions)

  await knex('employee')
    .insert(employees)

  await knex('status')
    .insert(statuses)

  await knex('role')
    .insert(roles)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex('user')
    .where('nickname', users.map(({ nickname }) => nickname))
    .delete()

  await knex('office')
    .whereIn('name', offices.map(({ name }) => name))
    .delete()

  await knex('position')
    .whereIn('name', positions.map(({ name }) => name))
    .delete()

  await knex('status')
    .whereIn('name', statuses.map(({ name }) => name))
    .delete()

  await knex('role')
    .whereIn('name', roles.map(({ name }) => name))
    .delete()
}
