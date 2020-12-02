const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize");

class User extends Model {}

User.init({
  email: DataTypes.STRING,
  password_hash: DataTypes.STRING,
  email_verified: DataTypes.BOOLEAN,
  email_verification_token: DataTypes.STRING,
  is_admin: DataTypes.BOOLEAN,
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

console.log(`User Model: ${User === sequelize.models.User}`);

module.exports = User;