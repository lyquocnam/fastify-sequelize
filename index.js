const fp = require('fastify-plugin')
const Sequelize = require('sequelize')

function plugin (fastify, options, next) {
  const instance = options.instance
  delete options.instance

  const sequelize = new Sequelize(options)
  fastify.decorate(instance || 'sequelize', sequelize)
  next()
}

module.exports = fp(plugin)