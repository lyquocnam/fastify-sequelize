const fastify = require('fastify')()
const fsequelize = require('fastify-sequelize')
const { resolve } = require('path')

fastify.register(fsequelize, {
  instance: 'db', // name of instance will be mapped to fastify
  dialect: 'sqlite',

  // SQLite only
  storage: resolve(__dirname, 'db.sqlite')
})
.ready(() => {

  // Test connection
  fastify.db
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
})

fastify.listen(3000, () => {
  console.log('> listening on port 3000')
})