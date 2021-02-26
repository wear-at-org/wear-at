import { AuthService } from '@services/auth';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    authService: AuthService;
  }
}

interface tokenBody {
  token: string;
};

type Request = FastifyRequest<{
  Body: tokenBody,
}>;
type Response = FastifyReply;

export const tokenHandler = async (req: Request, res: Response, done: ): Promise<void> => {
  const { token } = req.body;

  res.send({});
};
