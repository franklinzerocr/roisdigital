const homeController = require('../controllers/homeController');


module.exports = (router) => {
  router.get('/', async ctx => {
  	ctx.state.layout = await homeController.getLayout(ctx.session.lang,ctx.state.database)
  	ctx.state.home= await homeController.getPageContent(ctx.session.lang,ctx.state.database)
    ctx.state.view = {
    	title: 'Home',
    	lang: ctx.session.lang
    }
    await ctx.render('home')
  })


}
