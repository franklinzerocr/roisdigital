const config = require('config')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const loadRoutes = require("./app/routes")
const views = require('koa-views')
const serve = require('koa-static')
const database = require('./app/database/db.js');

const app = new Koa()
const router = new Router()




// Views setup, adds render() function to ctx object
app.use(views(
	path.join(__dirname, config.get('views.path')),
	config.get('views.options')
))

// Server static files (scripts, css, images)
app.use(serve(config.get('static.path')))

// Hydrate ctx.state with global settings, to make them available in views
app.use(async (ctx, next) => {
	ctx.state.settings = config.get('settings')
	ctx.state.urlWithoutQuery = ctx.origin + ctx.path
	await next()
})

// Configure router
loadRoutes(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx, next) => {
	ctx.redirect('/dead-link')
});

var date = new Date();
function getDateStringCustom(oDate) {
    var sDate;
    if (oDate instanceof Date) {
        sDate = oDate.getYear() + 1900
            + '/'
            + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
            + '/' + oDate.getDate()
            + ' - ' + oDate.getHours()
            + ':' + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
            + ':' + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
    } else {
        throw new Error("oDate is not an instance of Date");
    }
    return sDate;
}

// Start the app
const port = process.env.PORT || config.get('server.port')
app.listen(port, () => { 
	console.log(getDateStringCustom(date));
	console.log(`Application started - listening on port ${port}`) 
})
