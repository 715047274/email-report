const { Sequelize } = require('sequelize')


async function up({ context: queryInterface }) {
  await queryInterface.createTable('Tasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    taskName: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
     // defaultValue: Sequelize.fn('NOW')

    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
     // defaultValue: Sequelize.fn('NOW')
    }
  })
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('Tasks')
}

module.exports = { up, down }
