const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const fastifySequelize = require('./')
const { resolve } = require('path')
const Sequelize = require('sequelize')

test('fastify.sequelize should exist', t => {
    t.plan(2)

    const fastify = Fastify()

    fastify.register(fastifySequelize, {
        dialect: 'sqlite',
        storage: resolve(__dirname, 'db.sqlite')
    })

    fastify.ready(err => {
        t.error(err)
        t.ok(fastify.sequelize)

        fastify.sequelize.close()
        fastify.close()
    })
})

test('Sequelize instance name should work', t => {
    t.plan(2)

    const fastify = Fastify()

    fastify.register(fastifySequelize, {
        instance: 'db', // instance name
        dialect: 'sqlite',
        storage: resolve(__dirname, 'db.sqlite')
    })

    fastify.ready(err => {
        t.error(err)
        t.ok(fastify.db) // instance name

        fastify.db.close()
        fastify.close()
    })
})

test('Sequelize should work fine with records', t => {
    t.plan(3)

    const fastify = Fastify()

    fastify.register(fastifySequelize, {
        dialect: 'sqlite',
        storage: resolve(__dirname, 'db.sqlite')
    })

    fastify.ready(err => {
        t.error(err)
        t.ok(fastify.sequelize)

        const User = fastify.sequelize.define('user', {
            name: Sequelize.STRING
        })

        User.sync({ force: true }).then(() => {
            User.create({ name: 'Iron Man' })
                .then(user => {
                    t.ok(user)
                    fastify.close()
                })
                .catch(err => {
                    t.error(err)
                    fastify.close()
                })
        })
        .catch(err => {
          t.error(err)
          fastify.close()
        })
    })
})

test('Sequelize should close connection before Fastify closed', t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(fastifySequelize, {
      dialect: 'sqlite',
      storage: resolve(__dirname, 'db.sqlite')
  })

  fastify.ready(err => {
      t.error(err)

      fastify.close(() => {
        fastify
          .sequelize
          .authenticate()
          .then(() => {
            t.error('connection not closed !')
          })
          .catch(err => {
            t.ok(err)
          });
      })
  })
})
