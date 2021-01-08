import config from 'config';

export interface dbConfig {
  type: 'mysql' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

export interface Config {
  port: number;
  db: dbConfig;
}

export const loadConfig = (): Config => ({
  port: config.get<number>('global.port'),
  db: config.get<dbConfig>('db'),
});
