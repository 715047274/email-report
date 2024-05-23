import { fastify  } from 'fastify'

export default (FastifyServerOptions) => {
    const app = fastify(FastifyServerOptions)

    /* Your code here. Hello world example: */

    app.get('/', async (request, reply) => {
        return { hello: 'world' }
    })

    return app
}