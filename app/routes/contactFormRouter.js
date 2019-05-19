const emailController = require('../controllers/emailController');

module.exports = (router) => {
  	router.post('/Contact', async ctx => {
		mail=await emailController.sendContactMail(ctx.state.mailer,ctx.state.emailConfiguration,ctx.state.settings,ctx.request.body)
		console.log(mail)
		ctx.redirect('/#Contacted')
	})
}