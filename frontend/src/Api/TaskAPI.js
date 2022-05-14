export const TaskAPI = {
  searchTasks: (title) =>
    http('task/searchTasks')
      .method('get')
      .query({ title }),

  getTask: (taskId) =>
    http('task/getTask')
      .method('get')
      .query({ taskId }),

  createTask: (taskId, title, statusId) =>
    http('task/createTask')
      .method('post')
      .body({
        taskId,
        title,
        statusId
      }),

  updateTask: (taskId, taskData) =>
    http('task/updateTask')
      .method('put')
      .query({ taskId })
      .body(taskData),

  deleteTask: (taskId) =>
    http('task/deleteTask')
      .method('delete')
      .query({ taskId })
}
