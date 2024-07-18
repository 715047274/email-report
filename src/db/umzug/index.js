'use strict'

const umzugFactory = require('./umzugFactory')

function _createUmzug(dbInstance, params) {
  return umzugFactory.create(dbInstance, dbInstance.dbConfig.migrationPath, params)
}

const __ = {
  up: async (dbInstance, migrations, params) => {
    const umzug = _createUmzug(dbInstance, params)
    return Array.isArray(migrations) ? await umzug.up(migrations) : await umzug.up()
  },
  upTo: async (dbInstance, migrationId, params) => {
    const umzug = _createUmzug(dbInstance, params)
    return await umzug.up({ to: migrationId })
  },
  down: async (dbInstance, migrations, params) => {
    const umzug = _createUmzug(dbInstance, params)
    return Array.isArray(migrations) ? await umzug.down(migrations) : await umzug.down()
  },
  downTo: async (dbInstance, migrationId, params) => {
    const umzug = _createUmzug(dbInstance, params)
    return await umzug.down({ to: migrationId })
  },
}

module.exports = (function () {
  const result = {}
  for (const methodName in __) {
    result[methodName] = async function (dbInstance) {
      if (!dbInstance) {
        console.log('%c CmftDb Umzug dbInstance is null', 'color: red')
        return null
      }
      let upResult
      try {
        upResult = await __[methodName](...arguments)
        return upResult
      } catch (e) {
        upResult = e
        throw e
      } finally {
        console.info(
          `%c CmftDb Umzug ${dbInstance.dbName}, 
          MigrationAction: ${methodName}, 
          MigrationResult: ${Array.isArray(upResult) ? upResult.map((migration) => migration.file) : upResult}`,
          'color: red',
        )
      }
    }
  }
  return result
})()
