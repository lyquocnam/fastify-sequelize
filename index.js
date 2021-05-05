const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

function plugin (fastify, options) {
  const instance = options.instance || 'sequelize'
  const autoConnect = options.autoConnect || true

  delete options.instance
  delete options.autoConnect

  const sequelize = new Sequelize(options)

  if (autoConnect) {
    return sequelize.authenticate().then(decorate)
  }

  decorate()

  return Promise.resolve()

  function decorate () {
    fastify.decorate(instance, sequelize)
    fastify.addHook('onClose', (fastifyInstance, done) => {
      sequelize.close()
        .finally(done)
    })
  }
}

module.exports = fp(plugin)
