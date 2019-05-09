module.exports = (router) => {
  router.get('/dead-link', async ctx => {
    ctx.state.view = {
    	title: "Dead Link",
    	msg: 'YOU HAVE FOUND A DEAD LINK'
    }
    await ctx.render('dead-link');
  })
}