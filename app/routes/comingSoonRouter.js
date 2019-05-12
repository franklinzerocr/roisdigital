const comingSoonController = require('../controllers/comingSoonController')


module.exports = (router) => {
  router.get('/', async ctx => {
  	ctx.state.comingSoon= await comingSoonController.getPageContent(ctx.session.lang,ctx.state.database)
    ctx.state.view = {
    	title: 'Coming Soon'
    }
    await ctx.render('coming-soon');
  })
}