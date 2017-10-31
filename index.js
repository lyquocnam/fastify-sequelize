const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

function plugin (fastify, options, next) {
  const instance = options.instance || 'sequelize'
  const autoConnect = options.autoConnect || true

  delete options.instance
  delete options.autoConnect

  const sequelize = new Sequelize(options)
  if (autoConnect) {
      sequelize
          .authenticate()
          .then(() => {
              console.info('Connection has been established successfully.');
              runNext()
          })
          .catch(err => {
              console.error('Unable to connect to the database:', err);
          });
  }
  else {
    runNext()
  }

  function runNext () {
      fastify.decorate(instance, sequelize)
      next()
  }
}

module.exports = fp(plugin)