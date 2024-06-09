// models/Chat.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Chat = sequelize.define('Chat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = Chat;
