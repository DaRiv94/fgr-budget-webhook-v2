'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WebhookNotificationSchema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WebhookNotificationSchema.init({
    webhook_type: DataTypes.STRING,
    webhook_code: DataTypes.STRING,
    item_id: DataTypes.STRING,
    error: DataTypes.STRING,
    new_transactions: DataTypes.INTEGER,
    metadata: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'WebhookNotificationSchema',
  });
  return WebhookNotificationSchema;
};