const homeController = require('../controllers/homeController.js');


module.exports = (router) => {
  router.get('/home', async ctx => {
  	ctx.state.home= await homeController.getFullHome(ctx.state.database)
    ctx.state.view = {
    	title: 'Home',
      	msg: "This is da home"
    }
    await ctx.render('home')
  })


}
