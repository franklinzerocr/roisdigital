const deadLinkController = require('../controllers/deadLinkController');


module.exports = (router) => {
  router.get('/Dead-Link', async ctx => {
  	ctx.state.layout = await deadLinkController.getLayout(ctx.session.lang,ctx.state.database)
  	ctx.state.deadLink= await deadLinkController.getPageContent(ctx.session.lang,ctx.state.database)
    await ctx.render('dead-link');
  })
}