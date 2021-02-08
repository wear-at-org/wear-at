import 'module-alias/register';
import 'reflect-metadata';
import fastify, { FastifyRequest } from 'fastify';
import path from 'path';
import cors from 'fastify-cors';
import serveStatic from 'fastify-static';
import log from 'pino';
import { createConnection } from 'typeorm';
import { User } from '@models/user';
import { UserService } from '@services/user';
import { Config, loadConfig } from '@config/index';
import { apiHandler } from './controllers';

const logger = log({
  level: 'info',
  serializers: {
    req(request: FastifyRequest): any {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        headers: request.headers,
      };
    },
  },
});

interface muxOptions {
  config: Config;
  userService: UserService;
}

async function initialize(conf: Config): Promise<muxOptions> {
  try {
    const connection = await createConnection({
      type: conf.db.type,
      host: conf.db.host,
      port: conf.db.port,
      username: conf.db.username,
      password: conf.db.password,
      database: conf.db.database,
      synchronize: conf.db.synchronize,
      entities: [User],
    });
    const userRepository = connection.getRepository(User);
    return {
      config: conf,
      userService: new UserService(userRepository),
    };
  } catch (e) {
    logger.error(e, 'initialize');
    throw e;
  }
}

(async function run() {
  try {
    const conf = loadConfig();

    const opts = await initialize(conf);

    const server = fastify({
      logger,
      disableRequestLogging: true,
    });

    server.register(cors, {});
    server.register(serveStatic, { root: path.join(__dirname, '../public') });
    server.register((app, _, done) => {
      app.decorateRequest('userService', opts.userService);
      // app.addHook('preHandler', () => {});
      app.post('/api/:method', apiHandler);
      done();
    }, { prefix: '/v1' });
    server.get('/ping', (_, res) => {
      res.status(200).send({ result: 'ok' });
    });

    server.setErrorHandler((error, _req, res) => {
      logger.error({ error }, 'global.error');
      res.status(500).send({ error });
    });

    process.on('uncaughtException', (error) => {
      logger.error({ error }, 'global.uncaughtException');
    });
    process.on('unhandledRejection', (error) => {
      logger.error({ error }, 'global.unhandledRejection');
    });

    const port = conf.port || 8080;
    server.listen(port, '0.0.0.0', (err) => {
      if (err) {
        logger.error({ err }, 'server.error');
        process.exit(1);
      }
    });

    // TODO graceful shutdown, db close
  } catch (e) {
    logger.error(e, 'run');
    process.exit(1);
  }
}());
