const deadLinkController = require('../controllers/deadLinkController');


module.exports = (router) => {
  router.get('/Dead-Link', async ctx => {
  	ctx.state.deadLink= await deadLinkController.getPageContent(ctx.session.lang,ctx.state.database)
    ctx.state.view = {
    	title: "Dead Link"
    }
    await ctx.render('Dead-Link');
  })
}