import { User } from '@models/user';
import { createConnection } from 'typeorm';

export const setupDB = async (): Promise<void> => {
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

export const teardownDB = (): void => {

};
