const getMember = require('./getMember')

module.exports = async function (memberId, memberData, app) {
  const { log, knex } = app

  log.debug(`updateMember: memberId=${memberId}; memberData=${JSON.stringify(memberData)}`)

  await knex('member')
    .where({ memberId })
    .update(memberData)

  return getMember(memberId, app)
}
