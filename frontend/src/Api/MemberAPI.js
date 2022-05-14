export const MemberAPI = {
  searchMembers: (filter) =>
    http('member/searchMembers')
      .method('get')
      .query(filter),

  getMember: (memberId) =>
    http('member/getMember')
      .method('get')
      .query({ memberId }),

  createMember: (memberId, taskId, roleId, userId) =>
    http('member/createMember')
      .method('post')
      .body({
        memberId,
        taskId,
        roleId,
        userId
      }),

  updateMember: (memberId, memberData) =>
    http('member/updateMember')
      .method('put')
      .query({ memberId })
      .body(memberData),

  deleteMember: (memberId) =>
    http('member/deleteMember')
      .method('delete')
      .query({ memberId })
}
