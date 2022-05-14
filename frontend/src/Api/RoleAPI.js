export const RoleAPI = {
  searchRoles: (name) =>
    http('role/searchRoles')
      .method('get')
      .query({ name }),

  getRole: (roleId) =>
    http('role/getRole')
      .method('get')
      .query({ roleId }),

  createRole: (roleId, name) =>
    http('role/createRole')
      .method('post')
      .body({
        roleId,
        name
      }),

  updateRole: (roleId, roleData) =>
    http('role/updateRole')
      .method('put')
      .query({ roleId })
      .body(roleData),

  deleteRole: (roleId) =>
    http('role/deleteRole')
      .method('delete')
      .query({ roleId })
}
