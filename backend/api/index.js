module.exports = async function (app) {
  app.log.info('Mount "api"')

  app.decorateRequest('userId', null)

  app.addHook('onRequest', async function (request, reply) {
    const signUserId = request.cookies.userId

    if (typeof signUserId !== 'string') {
      return
    }

    const unsignUserId = reply.unsignCookie(signUserId)

    if (unsignUserId.valid && !unsignUserId.renew) {
      request.userId = unsignUserId.value
    }
  })

  app.register(require('./authentication'), { prefix: '/authentication' })

  app.register(require('./user'), { prefix: '/user' })

  app.register(require('./office'), { prefix: '/office' })

  app.register(require('./position'), { prefix: '/position' })

  app.register(require('./employee'), { prefix: '/employee' })

  app.register(require('./status'), { prefix: '/status' })

  app.register(require('./task'), { prefix: '/task' })

  app.register(require('./role'), { prefix: '/role' })

  app.register(require('./member'), { prefix: '/member' })
}
