const getMember = require('./getMember')

module.exports = async function (memberId, taskId, roleId, userId, app) {
  const { log, knex } = app

  log.debug(`createMember: memberId=${memberId}; taskId=${taskId}; roleId=${roleId}; userId=${userId}`)

  await knex('member')
    .insert({
      memberId,
      taskId,
      roleId,
      userId
    })

  return getMember(memberId, app)
}
