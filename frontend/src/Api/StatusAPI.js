export const StatusAPI = {
  searchStatuses: (name) =>
    http('status/searchStatuses')
      .method('get')
      .query({ name }),

  getStatus: (statusId) =>
    http('status/getStatus')
      .method('get')
      .query({ statusId }),

  createStatus: (statusId, name) =>
    http('status/createStatus')
      .method('post')
      .body({
        statusId,
        name
      }),

  updateStatus: (statusId, statusData) =>
    http('status/updateStatus')
      .method('put')
      .query({ statusId })
      .body(statusData),

  deleteStatus: (statusId) =>
    http('status/deleteStatus')
      .method('delete')
      .query({ statusId })
}
