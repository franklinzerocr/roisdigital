const comingSoonController = require('../controllers/comingSoonController')


module.exports = (router) => {
  	router.get('/', async ctx => {
  		ctx.state.layout = await comingSoonController.getLayout(ctx.session.lang,ctx.state.database)
		ctx.state.comingSoon= await comingSoonController.getPageContent(ctx.session.lang,ctx.state.database)
		await ctx.render('coming-soon');
  	})
}