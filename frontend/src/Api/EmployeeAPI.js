export const EmployeeAPI = {
  searchEmployees: (filter) =>
    http('employee/searchEmployees')
      .method('get')
      .query(filter),

  getEmployee: (employeeId) =>
    http('employee/getEmployee')
      .method('get')
      .query({ employeeId }),

  createEmployee: (employeeId, userId, officeId, positionId) =>
    http('employee/createEmployee')
      .method('post')
      .body({
        employeeId,
        userId,
        officeId,
        positionId
      }),

  updateEmployee: (employeeId, employeeData) =>
    http('employee/updateEmployee')
      .method('put')
      .query({ employeeId })
      .body(employeeData),

  deleteEmployee: (employeeId) =>
    http('employee/deleteEmployee')
      .method('delete')
      .query({ employeeId })
}
