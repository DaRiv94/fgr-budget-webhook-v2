const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../db/sequelize");

  class WebhookNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  WebhookNotification.init({
    webhook_type: DataTypes.STRING,
    webhook_code: DataTypes.STRING,
    item_id: DataTypes.STRING,
    error: DataTypes.STRING,
    new_transactions: DataTypes.INTEGER,
    metadata: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'WebhookNotification',
  });


  console.log(`WebhookNotification Model: ${WebhookNotification === sequelize.models.WebhookNotification}`);

  module.exports = WebhookNotification;
