const config = require('config')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const loadRoutes = require("./app/routes")
const views = require('koa-views')
const serve = require('koa-static')
const session = require('koa-session')
const database = require('./app/database/db.js')
const interface = require('./app/interface/interface.js')

const app = new Koa()
const router = new Router()

app.keys = [config.get("key")];

app.use(session(app));




// Views setup, adds render() function to ctx object
app.use(views(
	path.join(__dirname, config.get('views.path')),
	config.get('views.options')
))

// Server static files (scripts, css, images)
app.use(serve(config.get('static.path')))

// Hydrate ctx.state with global settings, to make them available in views
app.use(async (ctx, next) => {
    
    if (!ctx.session.lang){ // checking accepted lang (if not defined) from user browser to set default lang
        var languagesAccepted = ctx.request.header['accept-language'].match(/[a-zA-Z\-]{2,10}/g) || [];
        if (languagesAccepted.includes("es") || languagesAccepted.includes("es-ES"))
            ctx.session.lang="es"
        else ctx.session.lang="en"
    }

	ctx.state.settings = config.get('settings')
    ctx.state.database = database.connection(config.get('database'));
	ctx.state.urlWithoutQuery = ctx.origin + ctx.path

	await next()
})

// Configure router
loadRoutes(router)
app.use(router.routes())
app.use(router.allowedMethods())

// Reroute to Dead Link whenever 404
app.use(async (ctx, next) => {
	ctx.redirect('/dead-link')
});



// Start the app
const port = process.env.PORT || config.get('server.port')
app.listen(port, () => { 
	console.log(interface.getDateStringCustom());
	console.log(`Application started - listening on port ${port}`) 
})
