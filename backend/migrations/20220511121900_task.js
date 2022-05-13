/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable('task', (table) => {
    table.uuid('taskId').primary()
    table.string('title').notNullable()
    table.datetime('createdAt', { useTz: false, precision: 0 }).notNullable()
    table.uuid('statusId').notNullable()

    table
      .foreign('statusId')
      .references('status.statusId')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = (knex) =>
  knex.schema.dropTable('task')
