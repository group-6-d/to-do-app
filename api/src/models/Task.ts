import { DataTypes, Model, Sequelize, Deferrable } from 'sequelize';

class Task extends Model {}

const initialTaskModel = (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
      },
      priority: {
        type: DataTypes.ENUM('high', 'medium', 'low'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('to do', 'done'),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
          deferrable: new Deferrable.INITIALLY_IMMEDIATE(),
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // uncomment this line, once we have the Category model
        // references: {
        //   model: 'Category',
        //   key: 'id',
        //   deferrable: new Deferrable.INITIALLY_IMMEDIATE(),
        // },
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
      modelName: 'Task',
      // we want keep our table name, so tell Sequelize the table name
      // ref: https://sequelize.org/docs/v6/core-concepts/model-basics/#providing-the-table-name-directly
      tableName: 'task',
      // we have timestamps setup, so disable the default behavior
      // ref: https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
      timestamps: false,
      indexes: [{ fields: ['user_id', 'category_id'] }],
    },
  );
};

export { initialTaskModel, Task };
