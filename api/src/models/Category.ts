import { DataTypes, Model, Sequelize, Deferrable } from 'sequelize';

class Category extends Model {}

const initialTaskModel = (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      color: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      icon: {
        type: DataTypes.TEXT,
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
      modelName: 'Category',
      // we want keep our table name, so tell Sequelize the table name
      // ref: https://sequelize.org/docs/v6/core-concepts/model-basics/#providing-the-table-name-directly
      tableName: 'category',
      // we have timestamps setup, so disable the default behavior
      // ref: https://sequelize.org/docs/v6/core-concepts/model-basics/#timestamps
      timestamps: false,
      indexes: [{ fields: ['user_id'] }],
    },
  );
};

export { initialTaskModel, Category };
