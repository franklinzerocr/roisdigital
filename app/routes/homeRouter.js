const homeController = require('../controllers/homeController');


module.exports = (router) => {
  router.get('/', async ctx => {
  	ctx.state.layout = await homeController.getLayout(ctx.session.lang,ctx.state.database)
  	ctx.state.home= await homeController.getPageContent(ctx.session.lang,ctx.state.database)
    await ctx.render('home')
  })


}
