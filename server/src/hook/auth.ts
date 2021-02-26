import { AuthService } from '@services/auth';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    authService: AuthService;
  }
}

type Request = FastifyRequest;
type Response = FastifyReply;

export const authPreHandler = async (req: Request, res: Response): Promise<void> => {
  
  const token = req.headers["Authorization"];
  if (!token) {
    res.status(401);
  }
  req.authService.verify(token);
};
