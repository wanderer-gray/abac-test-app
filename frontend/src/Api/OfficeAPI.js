export const OfficeAPI = {
  searchOffices: (name) =>
    http('office/searchOffices')
      .method('get')
      .query({ name }),

  getOffice: (officeId) =>
    http('office/getOffice')
      .method('get')
      .query({ officeId }),

  createOffice: (officeId, name) =>
    http('office/createOffice')
      .method('post')
      .body({
        officeId,
        name
      }),

  updateOffice: (officeId, officeData) =>
    http('office/updateOffice')
      .method('put')
      .query({ officeId })
      .body(officeData),

  deleteOffice: (officeId) =>
    http('office/deleteOffice')
      .method('delete')
      .query({ officeId })
}
