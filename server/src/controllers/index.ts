import { FastifyReply, FastifyRequest } from 'fastify';

interface ApiParam {
  method: string;
}
type ApiBody = any;

type Request = FastifyRequest<{
  Params: ApiParam,
  Body: ApiBody,
}>;
type Response = FastifyReply;

export const apiHandler = (req: Request, res: Response): void => {
  const { method } = req.params;
  req.log.info({ body: req.body, method }, 'parsed body');
  res.send({ x: 1, y: 'a', z: method });
};
