require('dotenv').config();
const express = require('express');
const sequelize = require('./orm');
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/v1', router)

const start = async () => {
  try {
    await sequelize.authenticate() // connect DB
    await sequelize.sync() // this function checks the state of the database against the data schema
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
