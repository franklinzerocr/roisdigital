module.exports = (router, productsLoader) => {
  router.get('/', async ctx => {
    ctx.state.model = {
      title: 'Coming Soon'
    }
    await ctx.render('coming-soon');
  })
}