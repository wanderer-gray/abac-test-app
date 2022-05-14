export const PositionAPI = {
  searchPositions: (name) =>
    http('position/searchPositions')
      .method('get')
      .query({ name }),

  getPosition: (positionId) =>
    http('position/getPosition')
      .method('get')
      .query({ positionId }),

  createPosition: (positionId, name) =>
    http('position/createPosition')
      .method('post')
      .body({
        positionId,
        name
      }),

  updatePosition: (positionId, positionData) =>
    http('position/updatePosition')
      .method('put')
      .query({ positionId })
      .body(positionData),

  deletePosition: (positionId) =>
    http('position/deletePosition')
      .method('delete')
      .query({ positionId })
}
