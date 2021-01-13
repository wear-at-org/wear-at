import { User } from '@models/user';
import { createConnection, getConnection } from 'typeorm';

export const setupMockDB = async (): Promise<void> => {
  process.env['NODE-ENV'] = 'test';
  await createConnection({
    type: 'sqljs',
    database: new Uint8Array(),
    location: 'database',
    logging: false,
    synchronize: true,
    entities: [User],
  });
};

export const teardownMockDB = async (): Promise<void> => {
  await getConnection().close();
};
