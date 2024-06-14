const fp = require('fastify-plugin')


// import * as fp from 'fastify-plugin'

module.exports = fp(async function (app){
  app.decorate('posts', {
    async getAll(){return [{id:1, title: 'Post 1'}, {id:2, title: 'Post 2'}]},
  })
})
