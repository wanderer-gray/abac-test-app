module.exports = async function (memberId, { log, knex, httpErrors }) {
  log.debug(`deleteMember: memberId=${memberId}`)

  const numberMembersDeleted = await knex('member')
    .where({ memberId })
    .delete()

  if (!numberMembersDeleted) {
    throw httpErrors.notFound('Участник не найден')
  }
}
