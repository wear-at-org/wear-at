import { setupMockDB, teardownMockDB } from '@utils/test/mock';
import { getConnection } from 'typeorm';
import { User } from '@models/user';
import { UserService } from './user';

describe('user', () => {
  beforeEach(async () => {
    await setupMockDB();
  });
  afterEach(async () => {
    await teardownMockDB();
  });
  test('user create and list', async () => {
    const userMockRepository = getConnection().getRepository(User);
    const userService = new UserService(userMockRepository);

    userService.createUser({
      name: 'test1',
      email: 'test1@test.com',
      age: 10,
    });
    userService.createUser({
      name: 'test2',
      email: 'test2@test.com',
      age: 20,
    });

    const res = await userService.listUsers();
    expect(res.users.length).toEqual(2);
    expect(res.users[0].name).toEqual('test1');
    expect(res.users[1].name).toEqual('test2');
  });
});
