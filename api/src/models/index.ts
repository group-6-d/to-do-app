import { Sequelize } from 'sequelize';
import { initialUserModel, User } from './User';
import { initialTaskModel, Task } from './Task';

const initialModels = async (sequelize: Sequelize) => {
  await initialUserModel(sequelize);
  await initialTaskModel(sequelize);
};

export { initialModels, User, Task };
