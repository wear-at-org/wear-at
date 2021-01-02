import {
  Sequelize, DataTypes, Model, BuildOptions,
} from 'sequelize';

interface UserInstance extends Model{
  id: number;
  name: string;
  age: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UserStatic = typeof Model & {
  // eslint-disable-next-line no-unused-vars
  new (values?: any, options?: BuildOptions): UserInstance;
};

export const createUserModel = (sequelize: Sequelize): UserStatic => {
  const user = sequelize.define<UserInstance>('User', {
    ID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    NAME: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AGE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {});
  return user;
};
