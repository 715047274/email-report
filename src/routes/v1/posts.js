module.exports = async function (app){
  app.get('/posts', async (request, reply) => {
    return app.posts.getAll()
  })
}
