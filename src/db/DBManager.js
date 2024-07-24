// const DB = require('./DB')
const { DBConfig } = require('./config/config')

class DBManager {
  instances = {}

  initDB(dbConfig) {
    if (!(dbConfig instanceof DBConfig)) {
      throw new Error('dbConfig不是DBConfig类型')
    }
    if (dbConfig.dbName in this.instances) {
      return this.instances[dbConfig.dbName]
    }
    const dbInstance = new DB(dbConfig)
    // Store the dbName connection in our db object
    this.instances[dbConfig.dbName] = dbInstance
    console.info(`%c CmftDb addDB to db: ${dbConfig.dbName}`, 'color: red')
    return dbInstance
  }

  getDB(dbName) {
    const db = this.instances[dbName]
    if (!db) {
      throw new Error(`not such db ${dbName}`)
    }
    return db
  }

  getModel(dbName, modelName) {
    return this.getDB(dbName).getModel(modelName)
  }
}

module.exports = DBManager
