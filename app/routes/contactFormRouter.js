const nodemailer = require("nodemailer")
const config = require("config")

module.exports = (router) => {
  router.post('/contact', async ctx => {
  	
  	console.log(ctx.request.body)

  	// Generate test SMTP service account from ethereal.email
  	// Only needed if you don't have a real mail account for testing
  	let testAccount = await nodemailer.createTestAccount();

  	// create reusable transporter object using the default SMTP transport
  	let transporter = nodemailer.createTransport({
  		host: config.email.host,
  		port: config.email.port,
  		secure: config.email.secure, // true for 465, false for other ports
  		auth: {
  			user: config.email.user, // generated ethereal user
  			pass: config.email.pass // generated ethereal password
  		}
  	});

  	// send mail with defined transport object
  	let info = await transporter.sendMail({
  		from: "ROIS <"+config.email.address+">",
  		to: "contact@roisdigital.com",//"franklin@roisdigital.com",
  		subject: "ROIS Digital Agency - Contact Form",
  		text: 	"Name: "+ctx.request.body.name+"\n"+
  				"Email: "+ctx.request.body.email+"\n"+
  				"Phone: "+ctx.request.body.phone+"\n"+
  				"Message: "+ctx.request.body.message+"\n"
  		,
  		html: 	"<p><b>Name: </b> "+ctx.request.body.name+"</p>"+
  				"<p><b>Email: </b> "+ctx.request.body.email+"</p>"+
  				"<p><b>Phone: </b> "+ctx.request.body.phone+"</p>"+
  				"<p><b>Message: </b> "+ctx.request.body.message+"</p>"
  	});


    ctx.redirect('/')
  }).get('/contact', async ctx => {
    ctx.redirect('/Dead-Link')
  })
}