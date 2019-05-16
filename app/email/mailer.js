const nodemailer = require("nodemailer")

module.exports= {

	transporter: function(emailConfiguration){
		return nodemailer.createTransport({
			host: emailConfiguration.host,
			port: emailConfiguration.port,
			secure: emailConfiguration.secure, // true for 465, false for other ports
			auth: {
				user: emailConfiguration.user, 
				pass: emailConfiguration.pass 
			}
		}); 
	}

}