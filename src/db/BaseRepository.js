const dbManager = require('./index')
const Sequelize = require('sequelize')

class BaseRepository {
  constructor(dbName) {
    this.dbName = dbName
  }

  getModel(modelName) {
    return dbManager.getModel(this.dbName, modelName)
  }

  getDBContext() {
    return dbManager.getDB(this.dbName).dbConfig.context
  }

  get sequelize() {
    return dbManager.getDB(this.dbName).sequelize
  }

  handleCreateError(e, uniqueKeys = []) {
    if (
      e instanceof Sequelize.UniqueConstraintError
      && (!uniqueKeys
        || uniqueKeys.length === 0
        || (e.fields
          && e.fields.length === uniqueKeys.length
          && uniqueKeys.every((uniqueKey) => e.fields.some((value) => value === uniqueKey))))
    ) {
      console.debug(
        `unique constraint error, unique key = ${e.errors.map((error) => error.path)}, constraint values=${e.errors.map(
          (error) => error.value
        )}`
      )
      return null
    }
    throw e
  }
}
