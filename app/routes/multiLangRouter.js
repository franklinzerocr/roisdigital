
module.exports = (router) => {
  	router.get('/en', async ctx => {
  		ctx.session.lang="en" 
		ctx.redirect('/')
	})
  	router.get('/es', async ctx => {
  		ctx.session.lang="es" 
		ctx.redirect('/')
	})
}