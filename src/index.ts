import fastify from 'fastify'
import fastifyMongodb,  { FastifyMongodbOptions } from '@fastify/mongodb'
import { routes } from './routes/index.ts';
const PORT = 8080;
const mongoOptions: FastifyMongodbOptions = {
  url: process.env.MONGOURL,
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
      port: PORT,
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