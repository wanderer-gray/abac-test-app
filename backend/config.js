const host = 'localhost'
const port = 81

module.exports = {
  development: {
    oas: {
      routePrefix: '/swagger',
      swagger: {
        info: {
          title: 'abac-test-app',
          version: '1.0.0'
        },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        servers: [{
          url: `http://${host}:${port}`,
          description: 'Local server'
        }],
        tags: [
          { name: 'authentication', description: 'Аутентификация' },
          { name: 'user', description: 'Пользователь' },
          { name: 'office', description: 'Офис' },
          { name: 'position', description: 'Должность' },
          { name: 'employee', description: 'Сотрудник' },
          { name: 'status', description: 'Статус' },
          { name: 'task', description: 'Задача' },
          { name: 'role', description: 'Роль' },
          { name: 'member', description: 'Участник' }
        ]
      },
      exposeRoute: true
    },
    knex: {
      client: 'sqlite3',
      connection: {
        filename: './abac-test-app.sqlite'
      },
      pool: {
        min: 1,
        max: 4,
        afterCreate: (conn, cb) =>
          conn.run('PRAGMA foreign_keys = ON', cb)
      },
      migrations: {
        tableName: 'knex_migrations'
      },
      useNullAsDefault: true
    },
    cookie: {
      secret: 'test_secret'
    },
    server: {
      host,
      port
    }
  }
}
