const contactFormController = require('../controllers/contactFormController');

module.exports = (router) => {
  	router
  		.post('/Contact', async ctx => {
			mail=await contactFormController.sendMail(ctx.state.mailer,ctx.state.emailConfiguration,ctx.state.settings,ctx.request.body)
			console.log(mail)
			ctx.redirect('/#Contacted')
		})

  		.get('/Contact', async ctx => {
    		ctx.redirect('/Dead-Link')
  		})
}