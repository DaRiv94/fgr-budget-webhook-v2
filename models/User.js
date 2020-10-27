const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize");

class User extends Model {}

User.init({
  // Model attributes are defined here
  id:{
    type:Sequelize.INTEGER(11),
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(`User Model: ${User === sequelize.models.User}`); // true

module.exports = User;