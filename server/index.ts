import fastify from 'fastify';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'fastify-cors';
import serveStatic from 'fastify-static';
import log from 'pino';
import route from './src/routes';

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

const app = fastify({ logger });
app.register(cors, {});
app.register(serveStatic, { root: path.join(__dirname, 'public') });

app.setErrorHandler((error, req, res) => {
  logger.error(error);
  // TODO error handler
  res.status(500).send({ ok: false });
});

app.register(route, { prefix: '/v1' });

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    logger.error({ err }, 'server-error');
    process.exit(1);
  }
});

// TODO graceful shutdown
