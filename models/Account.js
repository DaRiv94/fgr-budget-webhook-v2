const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize");

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
  available_balance: DataTypes.DOUBLE,
  current_balance: DataTypes.DOUBLE
}, {
  sequelize,
  modelName: 'Account',
});

module.exports = Account