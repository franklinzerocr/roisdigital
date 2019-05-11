const homeController = require('../controllers/homeController.js');


module.exports = (router) => {
  router.get('/home', async ctx => {
  	ctx.state.home= await homeController.getFullHome(ctx.session.lang,ctx.state.database)
  	// console.log(ctx.state.home.sections.data)
    ctx.state.view = {
    	title: 'Home',
      	msg: "This is da home"
    }
    await ctx.render('home')
  })


}
