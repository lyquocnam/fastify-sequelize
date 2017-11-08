const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

function plugin (fastify, options) {
  return new Promise((resolve, reject) => {
    const instance = options.instance || 'sequelize'
    const autoConnect = options.autoConnect || true

    delete options.instance
    delete options.autoConnect

    const sequelize = new Sequelize(options)
    if (autoConnect) {
        sequelize
            .authenticate()
            .then(() => {
                console.info('Connection has been established successfully.')
                runNext()
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err)
                return reject(err)
            })
    } else {
      runNext()
    }

    function runNext () {
        fastify.decorate(instance, sequelize)
        fastify.addHook('onClose', (fastifyInstance, done) => {
          sequelize.close()
            .then(done)
            .catch(err => {
              done()
            })
        })
        return resolve()
    }
  })
}

module.exports = fp(plugin)
