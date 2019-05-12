const homeController = require('../controllers/homeController');


module.exports = (router) => {
  router.get('/home', async ctx => {
  	ctx.state.home= await homeController.page(ctx.session.lang,ctx.state.database)
    ctx.state.view = {
    	title: 'Home'
    }
    await ctx.render('home')
  })


}
