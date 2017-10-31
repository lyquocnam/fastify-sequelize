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
    instance: 'sequelize'
    
    // other sequelize config goes here
    dialect: 'sqlite',

    // SQLite only
    storage: 'path/to/db.sqlite'
}

fastify
    .register(fsequelize, sequelizeConfig)
    .ready(() => {

    // Test connection
    fastify.sequelize // instance name default is sequelize
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
```
- `instance`: *(optional)* the name of instance will be mapped to fastify, default is `sequelize`
- `sequelizeConfig`: all sequelize configurations, you can see [here](http://docs.sequelizejs.com/manual/installation/getting-started.html#setting-up-a-connection).
