import { UserService } from '@services/user';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userService: UserService;
  }
}

interface ApiParam {
  method: string;
}
type ApiBody = any;

type Request = FastifyRequest<{
  Params: ApiParam,
  Body: ApiBody,
}>;
type Response = FastifyReply;

export const apiHandler = async (req: Request, res: Response): Promise<void> => {
  const { method } = req.params;

  const input = req.body;
  let result: any;

  req.log.info({ method, input }, 'api.request');

  switch (method) {
    case 'user.list':
      result = await req.userService.listUsers();
      break;
    case 'user.create':
      result = await req.userService.createUser(input);
      break;
    default:
      throw new Error(`Not supported methd ${method}`);
  }
  res.send(result);
};
