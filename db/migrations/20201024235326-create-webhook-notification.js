'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WebhookNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      webhook_type: {
        type: Sequelize.STRING
      },
      webhook_code: {
        type: Sequelize.STRING
      },
      item_id: {
        type: Sequelize.STRING
      },
      error: {
        type: Sequelize.STRING
      },
      new_transactions: {
        type: Sequelize.INTEGER
      },
      metadata: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WebhookNotifications');
  }
};