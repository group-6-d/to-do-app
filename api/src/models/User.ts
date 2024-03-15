import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {}

const initialUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.TEXT,
      },
      last_name: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.TEXT,
        defaultValue: 'system',
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_by: {
        type: DataTypes.TEXT,
        defaultValue: 'system',
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      // we want keep our table name, so tell Sequelize the table name
      // ref: https://sequelize.org/docs/v6/core-concepts/model-basics/#providing-the-table-name-directly
      tableName: 'user',
      // we have timestamps setup, so disable the default behavior
      // ref: https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
      timestamps: false,
    },
  );

  return User;
};

export { initialUserModel, User };
