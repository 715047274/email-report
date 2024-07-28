import autoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastify from 'fastify'
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// const DBManager = require('./db')
// index.js
const {Sequelize} = require('sequelize')
const {Umzug, SequelizeStorage} = require('umzug')

const sequelize = new Sequelize({dialect: 'sqlite', storage: './data/db.sqlite'})
const migrationBasePath = path.join(__dirname, 'db','migrations')
const umzug = new Umzug({
    migrations: {glob: ["./db/migrations/*.js", {cwd: __dirname}]},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize}),
    logger: console,
})

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.

export default (FastifyServerOptions) => {
    const app = fastify(FastifyServerOptions)
    // fastify.register(autoload, {
    //     dir: `${__dirname}/services`
    // })
    //let route = import('./routes/v1/posts')


    app.register(autoLoad, {
        dir:join(__dirname, 'routes')
    })
    app.register(autoLoad, {
        dir:join(__dirname, 'services')})


    /* Your code here. Hello world example: */
    app.ready().then(() => {
        app.log.info('App is ready')

       //  const dbManager = DBManager.initDB(require('./db/config/config')).getClientDbConfig(userId).upgrade()
    })
    app.addHook('onReady', async function () {
        // [2]
        umzug.up()
        app.log.info("this is on Ready called ")
    })


    app.get('/', async (request, reply) => {
        return { hello: 'world' }
    })



    return app
}
