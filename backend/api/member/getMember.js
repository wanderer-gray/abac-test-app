module.exports = async function (memberId, app) {
  const { log, knex, httpErrors } = app

  log.debug(`getMember: memberId=${memberId}`)

  const member = await knex('member')
    .where({ memberId })
    .first([
      'memberId',
      'roleId',
      'userId'
    ])

  if (!member) {
    throw httpErrors.notFound('Участник не найден')
  }

  return member
}
