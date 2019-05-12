const deadLinkController = require('../controllers/deadLinkController');


module.exports = (router) => {
  router.get('/dead-link', async ctx => {
  	ctx.state.deadLink= await deadLinkController.getPageContent(ctx.session.lang,ctx.state.database)
    ctx.state.view = {
    	title: "Dead Link"
    }
    await ctx.render('dead-link');
  })
}