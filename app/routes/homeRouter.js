const homeController = require('../controllers/homeController');


module.exports = (router) => {
  router.get('/home', async ctx => {
  	ctx.state.layout = await homeController.getLayout(ctx.session.lang,ctx.state.database)
  	ctx.state.home= await homeController.getPageContent(ctx.session.lang,ctx.state.database)
    ctx.state.view = {
    	title: 'Home'
    }
    await ctx.render('home')
  })


}
