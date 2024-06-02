import fastify from 'fastify'
import fastifyMongodb, { FastifyMongodbOptions } from '@fastify/mongodb'
import { routes } from './routes/index.ts';
const port = process.env.PORT || 4000;
const mongo_url = process.env.MONGOURL

const mongoOptions: FastifyMongodbOptions = {
  url: `${mongo_url}`,
  forceClose: true
}

const server = fastify({ logger: true });
server.register(fastifyMongodb, mongoOptions)

routes.forEach((route) => {
  server.route(route);
});


// starting server
const start = async () => {
  try {
    await server.listen({
      port: port,
      listenTextResolver: (address) => {
        return `Server is listening at ${address}`;
      },
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();