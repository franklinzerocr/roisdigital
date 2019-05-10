const homeController = require('../controllers/homeController.js');


module.exports = (router) => {
  router.get('/home', async ctx => {
  	ctx.state.static= await homeController.getStaticContent();
  	ctx.state.services= await homeController.getServices();
  	ctx.state.portfolio= await homeController.getPortfolio();
  	ctx.state.teamMembers= await homeController.getTeamMembers();
    ctx.state.view = {
    	title: 'Home',
      	msg: "This is da house"
    }
    
    await ctx.render('home');

  })


}
