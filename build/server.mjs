import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fastify from "fastify";
import fs from "fs";
import envSchema from "env-schema";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = (FastifyServerOptions) => {
  const app2 = fastify(FastifyServerOptions);
  app2.register(autoLoad, {
    dir: join(__dirname, "routes")
  });
  app2.register(autoLoad, {
    dir: join(__dirname, "services")
  });
  app2.get("/", async (request, reply) => {
    return { hello: "world" };
  });
  return app2;
};
const logDir = "./logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logger = {
  level: "warn",
  file: logDir + "/warn-logs.log"
};
const application = app({
  logger,
  pluginTimeout: 5e4,
  bodyLimit: 15485760
});
{
  try {
    const { PORT } = envSchema({
      dotenv: true,
      schema: {
        type: "object",
        required: ["PORT"],
        properties: {
          PORT: {
            type: "string",
            default: 3e3
          }
        }
      }
    });
    application.ready().then(() => {
      application.log.info("Application ready");
    });
    application.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server started on 0.0.0.0:${PORT}`);
  } catch (err) {
    application.log.error(err);
    process.exit(1);
  }
}
const viteNodeApp = application;
export {
  viteNodeApp
};
