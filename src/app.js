import autoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastify from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DBManager = require('./db')

import path from 'path';

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
        const dbManager = DBManager.initDB(require('./db/config/config'))
    })


    app.get('/', async (request, reply) => {
        // app.log.info("-----------")
        // app.log.info(__filename)
        return { hello: 'world' }
    })



    return app
}
