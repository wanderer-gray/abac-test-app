/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('employee', (table) => {
    table.uuid('employeeId').primary()
    table.uuid('userId').notNullable()
    table.uuid('officeId').notNullable()
    table.uuid('positionId').notNullable()

    table
      .foreign('userId')
      .references('user.userId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('officeId')
      .references('office.officeId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('positionId')
      .references('position.positionId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.unique(['userId', 'officeId', 'positionId'])
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('employee')
