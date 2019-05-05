module.exports = (router) => {
  router.get('/dead-link', async ctx => {
    ctx.state.model = {
      msg: 'YOU HAVE FOUND A DEAD LINK'
    }
    await ctx.render('dead-link');
  })
}