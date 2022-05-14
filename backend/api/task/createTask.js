const uuid = require('../../uuid')
const { getDateTimeISO } = require('../../datetime')

const getTask = require('./getTask')

module.exports = async function (userId, taskId, title, statusId, app) {
  const { log, knex } = app

  log.debug(`createTask: userId=${userId}; taskId=${taskId}; title=${title}; statusId=${statusId}`)

  await knex.transaction(async (trx) => {
    const { roleId } = await trx('role')
      .where('name', 'Создатель')
      .first('roleId')

    await trx('task')
      .insert({
        taskId,
        title,
        createdAt: getDateTimeISO(),
        statusId
      })

    await trx('member')
      .insert({
        memberId: uuid(),
        taskId,
        roleId,
        userId
      })
  })

  return getTask(taskId, app)
}
