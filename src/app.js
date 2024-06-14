 import autoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastify from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


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

    app.get('/', async (request, reply) => {
        return { hello: 'world' }
    })



    return app
}
