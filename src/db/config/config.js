'use strict'

const path = require('path')
const { app, remote, ipcMain, ipcRenderer } = require('electron')
const fs = require('fs')

class DBConfig {
  constructor({
                dbName,
                dialect = 'sqlite',
                storage,
                password = '',
                modelCreators = [],
                migrationPath = '',
                context = {},
              }) {
    if (!dbName) {
      throw new Error('dbName不能为空')
    }
    this.dbName = dbName
    this.dialect = dialect
    this.storage = storage
    this.password = password
    this.modelCreators = modelCreators
    this.migrationPath = migrationPath
    this.context = context
  }
}

function getAppPath() {
  if (ipcMain) {
    return app.getAppPath()
  }
  if (ipcRenderer) {
    return remote.app.getAppPath()
  }
  return ''
}

function getUserDataPath() {
  if (ipcMain) {
    return app.getPath('userData')
  }
  if (ipcRenderer) {
    return remote.app.getPath('userData')
  }
  return ''
}

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const appPath = getAppPath()
const userDataPath = getUserDataPath()
const userFilesPath = isDev ? path.join(__dirname, '../../../data') : path.resolve(getUserDataPath(), 'files')
const migrationBasePath = isDev
  ? path.join(__dirname, '../migrations')
  : path.resolve(getAppPath(), '../app.asar/dist/electron/cmftDb/migrations')
const backupTmpPath = isDev ? path.join(__dirname, '../../../tmp/db/backup') : path.join(userFilesPath, 'tmp/db/backup')

const devPassword = ''

function getModelCreators(modelPath) {
  return fs
    .readdirSync(modelPath)
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .map((file) => require(`${modelPath}/${file}`))
}
let adminDbModelCtx = null
try {
  adminDbModelCtx = require.context('../models/adminDb', true, /^.*\.js$/)
} catch (e) {}
const adminDbConfig = new DBConfig({
  dbName: 'adminDb',
  storage: path.join(userFilesPath, 'adminDb.sqlite'),
  password: isDev ? devPassword : 'adminDbCmft2021012100001',
  migrationPath: path.join(migrationBasePath, 'adminDb'),
  modelCreators: adminDbModelCtx
    ? adminDbModelCtx.keys().map(adminDbModelCtx)
    : getModelCreators(path.join(__dirname, '../models/adminDb')),
})
let clientDbModelCtx = null
try {
  clientDbModelCtx = require.context('../models/clientDb', true, /^.*\.js$/)
} catch (e) {}
function getClientDbConfig(userId = 'anonymous') {
  return new DBConfig({
    dbName: 'clientDb',
    storage: path.join(userFilesPath, userId, 'clientDb.sqlite'),
    password: isDev ? devPassword : userId,
    migrationPath: path.join(migrationBasePath, 'clientDb'),
    modelCreators: clientDbModelCtx
      ? clientDbModelCtx.keys().map(clientDbModelCtx)
      : getModelCreators(path.join(__dirname, '../models/clientDb')),
    context: { userId },
  })
}
function getLocalDbConfig(userId = 'anonymous') {
  return new DBConfig({
    dbName: 'localDb',
    storage: path.join(userFilesPath, userId, isDev ? 'localdev.sqlite' : `${userId}.db`),
    password: isDev ? devPassword : userId,
  })
}

module.exports = {
  adminDbConfig,
  getClientDbConfig,
  getLocalDbConfig,
  DBConfig,
  backupTmpPath,
  appPath,
  userDataPath,
}
