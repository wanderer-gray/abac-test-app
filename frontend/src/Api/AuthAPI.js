export const AuthAPI = {
  check: () =>
    http('authentication/checkAuth')
      .method('get'),

  logIn: (nickname, password) =>
    http('authentication/logIn')
      .method('post')
      .body({
        nickname,
        password
      }),

  logOut: () =>
    http('authentication/logOut')
      .method('delete')
}
