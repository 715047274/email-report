const Sequelize = require('sequelize')
const umzugService = require('./umzug')
const CmftSqlite3 = require('../lib/js/db/CmftSqlite3')
const { DBConfig } = require('./config/config')

class DB {
  dbName = ''
  dbConfig = ''
  sequelize = ''
  constructor(dbConfig) {
    if (!(dbConfig instanceof DBConfig)) {
      throw new Error('dbConfig不是DBConfig类型')
    }
    this.dbName = dbConfig.dbName
    if (!dbConfig.storage) {
      console.info(`%c CmftDb createDBInstance: storage config of ${dbConfig.dbName} is null, skip`, 'color: red')
      return null
    }
    this.dbConfig = dbConfig
    this.cmftSqlite3 = new CmftSqlite3(dbConfig.storage, dbConfig.password)
    // Init Sequelize and Umzug
    this.sequelize = new Sequelize('', '', dbConfig.password, {
      dialect: dbConfig.dialect,
      storage: dbConfig.storage,
      logging: false,
    })
    this.test()
      .then((result) => {
        console.info(`%c CmftDb ${dbConfig.dbName} test success`, 'color: red')
      })
      .catch((e) => {
        console.info(`%c CmftDb ${dbConfig.dbName} test fail`, 'color: red')
      })
    // Add models
    if (Array.isArray(dbConfig.modelCreators)) {
      dbConfig.modelCreators.forEach(this.addModel.bind(this))
    }
    delete dbConfig.password
    console.debug(
      `%c CmftDb createDBInstance: ${dbConfig.dbName} init success with config=${JSON.stringify(dbConfig)}`,
      'color: red'
    )
  }

  test() {
    return this.sequelize.authenticate()
  }

  async upgrade() {
    await this.cmftSqlite3.isEncrypted()
    if (!this.dbConfig.migrationPath) {
      return
    }
    // 升级
    return await umzugService.up(this, null, this.dbConfig.context)
    // 模型和表同步，不建议开启
    // await this.sequelize.sync({ force: true })
  }

  addModel(modelCreator) {
    const model = modelCreator(this.sequelize, Sequelize.DataTypes)
    // Associate dbInstance to model
    model.associate(this)
  }

  getModel(modelName) {
    if (!this.sequelize.models[modelName]) {
      throw new Error(`can not find model ${modelName} in db ${this.dbName}`)
    }
    return this.sequelize.models[modelName]
  }
}

module.exports = DB
