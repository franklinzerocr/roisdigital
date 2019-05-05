module.exports = (router) => {
  router.get('/home', async ctx => {
    ctx.state.model = {
      title: 'Hey there,'
    }
    await ctx.render('home');
  })
}