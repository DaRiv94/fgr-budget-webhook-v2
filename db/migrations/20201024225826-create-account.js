
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      item_id: {
        type: Sequelize.STRING
      },
      account_id: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      official_name: {
        type: Sequelize.STRING
      },
      available_balance: {
        type: Sequelize.DOUBLE
      },
      current_balance: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Accounts');
  }
};