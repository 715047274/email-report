import app from './app'
import logger from './logger'
import envSchema from 'env-schema'

const application = app({
    logger,
    pluginTimeout: 50000,
    bodyLimit: 15485760
})

if (import.meta.env.PROD) {
    try {
        // Get port from .env or 3000
        const { PORT } = envSchema({
            dotenv: true,
            schema: {
                type: 'object',
                required: ['PORT'],
                properties: {
                    PORT: {
                        type: 'string',
                        default: 3000
                    }
                }
            }
        })

        application.listen({ port: PORT , host: '0.0.0.0' })
        console.log(`Server started on 0.0.0.0:${PORT}`)
    } catch (err) {
        application.log.error(err)
        process.exit(1)
    }
}

export const viteNodeApp = application