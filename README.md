# fastify-sequelize
Fastity plugin work with Sequelize (adapter for NodeJS -> Sqlite, Mysql, Mssql, Posgres)

## install
```bash
npm install fastify-sequelize
```

## Usage
```javascript
const fastify = require('fastify')()
const fsequelize = require('fastify-sequelize')

const sequelizeConfig = {
    instance: 'sequelize', // the name of fastify plugin instance.
    autoConnect: true, // auto authentication and test connection on first run
    
    // other sequelize config goes here
    dialect: 'sqlite',

    // SQLite only
    storage: 'path/to/db.sqlite'
}

fastify
    .register(fsequelize, sequelizeConfig)
    .ready()

fastify.listen(3000, () => {
  console.log('> listening on port 3000')
})
```
- `instance`: *(optional)* the name of instance will be mapped to fastify, default is `sequelize`
- `autoConnect`: `default: true` auto authentication and test connection on first run.
- `sequelizeConfig`: all sequelize configurations, you can see [here](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection).
