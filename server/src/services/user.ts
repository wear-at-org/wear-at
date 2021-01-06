import { Repository } from 'typeorm';
import { User } from '@models/user';

interface listUsersResponse {
  users: User[];
}

interface createUserRequest {
  name: string;
  email: string;
  age: number;
}

interface createUserResponse {
  id: number;
}

export class UserService {
  public constructor(
    private userRepository: Repository<User>,
  ) {}

  public async listUsers(): Promise<listUsersResponse> {
    const users = await this.userRepository.find();
    return {
      users,
    };
  }

  public async createUser(req: createUserRequest): Promise<createUserResponse> {
    const user = new User();
    user.name = req.name;
    user.email = req.email;
    user.age = req.age;

    await this.userRepository.insert(user);
    return {
      id: user.id,
    };
  }
}
