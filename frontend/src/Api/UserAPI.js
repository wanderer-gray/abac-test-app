export const UserAPI = {
  searchUsers: (nickname) =>
    http('user/searchUsers')
      .method('get')
      .query({ nickname }),

  getUser: (userId) =>
    http('user/getUser')
      .method('get')
      .query({ userId }),

  createUser: (userId, nickname, password) =>
    http('user/createUser')
      .method('post')
      .body({
        userId,
        nickname,
        password
      }),

  updateUser: (userId, userData) =>
    http('user/updateUser')
      .method('put')
      .query({ userId })
      .body(userData),

  deleteUser: (userId) =>
    http('user/deleteUser')
      .method('delete')
      .query({ userId })
}
