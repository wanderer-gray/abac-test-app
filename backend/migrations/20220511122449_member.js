/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('member', (table) => {
    table.uuid('memberId').primary()
    table.uuid('taskId').notNullable()
    table.uuid('roleId').notNullable()
    table.uuid('userId').notNullable()

    table
      .foreign('taskId')
      .references('task.taskId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('roleId')
      .references('role.roleId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table
      .foreign('userId')
      .references('user.userId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.unique(['taskId', 'roleId', 'userId'])
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('member')
