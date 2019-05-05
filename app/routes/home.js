module.exports = (router) => {
  router.get('/home', async ctx => {
    ctx.state.view = {
    	title: 'Home',
      	msg: 'This is da house'
    }
    await ctx.render('home');
  })
}