

module.exports = (router) => {
  router.get('/contact', async ctx => {
  	console.log(ctx.request.body)
    ctx.redirect('/')
  })


}
