'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
      // Account.hasMany(Transaction);
      // Transaction.belongsTo(Account);
    }
  };
  Account.init({
    item_id: DataTypes.STRING,
    account_id: DataTypes.STRING,
    name: DataTypes.STRING,
    official_name: DataTypes.STRING,
    available_balence: DataTypes.DOUBLE,
    current_balence: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};