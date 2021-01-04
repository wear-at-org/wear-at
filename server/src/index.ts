import 'module-alias/register';
import fastify from 'fastify';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'fastify-cors';
import serveStatic from 'fastify-static';
import log from 'pino';
import sequelize from 'sequelize';
import { apiHandler } from './controllers';

dotenv.config();

const logger = log({
  level: 'info',
  serializers: {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        path: request.path,
        headers: request.headers,
      };
    },
  },
});

const db = new sequelize.Sequelize('mysql://localhost:3306/scot', {});
// try {
//   await db.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const server = fastify({
  logger,
  disableRequestLogging: true,
});

server.register(cors, {});
server.register(serveStatic, { root: path.join(__dirname, '../public') });
server.register(async (app) => {
  // cApp.addHook('preHandler', () => {});
  app.post('/api/:method', apiHandler);
}, { prefix: '/v1' });

server.setErrorHandler((error, req, res) => {
  logger.error({ error }, 'global.error');
  res.status(500).send({ error });
});

process.on('uncaughtException', (error) => {
  logger.error({ error }, 'global.uncaughtException');
});
process.on('unhandledRejection', (error) => {
  logger.error({ error }, 'global.unhandledRejection');
});

const port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    logger.error({ err }, 'server-error');
    process.exit(1);
  }
});

// TODO graceful shutdown, db close
