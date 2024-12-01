import fastify from 'fastify'
import formbody from '@fastify/formbody'
import fastifyMongodb, { FastifyMongodbOptions } from '@fastify/mongodb'
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import { routes } from './routes/index.ts';
const port = process.env.PORT || 4000;
const mongo_url = process.env.MONGOURL

const mongoOptions: FastifyMongodbOptions = {
  url: `${mongo_url}`,
  forceClose: true
}

const server = fastify({ logger: true });

server.register(fastifyMongodb, mongoOptions)
server.register(formbody)
server.register(cookie, {
  secret: "my-secret", 
  parseOptions: {}     
} as FastifyCookieOptions)

routes.forEach((route) => {
  server.route(route);
});


// starting server
const start = async () => {
  try {
    await server.listen({
      port: port,
      host: '0.0.0.0',
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