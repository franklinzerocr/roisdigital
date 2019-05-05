module.exports = (router) => {
  router.get('/', async ctx => {
    ctx.state.view = {
      title: 'Coming Soon'
    }
    await ctx.render('coming-soon');
  })
}