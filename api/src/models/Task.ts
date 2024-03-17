// import sequelize which we create in db file
  const sequelize = require('../orm');

// из пакета sequelize нам потребуется импортировать класс с помощью которого описываются типы того или иного поля
const { DataTypes } = require('sequelize');

const Task = sequelize.define('task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  due_date: { type: DataTypes.DATE },
  priority: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false  },
});

module.exports = {
  Task,
};
