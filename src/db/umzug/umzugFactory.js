'use strict'

const Umzug = require('umzug')
const Sequelize = require('sequelize')

module.exports = {
  create: (dbInstance, migrationPath, params = {}) => {
    Object.assign(params, {
      dbInstance,
    })
    return new Umzug({
      migrations: {
        path: migrationPath,
        pattern: /^\d+[\w-]+\.js$/,
        params: [dbInstance.sequelize.getQueryInterface(), Sequelize, params],
        wrap: function (fun) {
          return fun
        },
      },
      logging: console.log,
      storage: 'sequelize',
      storageOptions: {
        sequelize: dbInstance.sequelize,
      },
    })
  },
}
