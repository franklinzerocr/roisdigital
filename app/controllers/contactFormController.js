
module.exports = {

	sendMail: async function(mailer,emailConfiguration,settings,params){ 

		// Send Email
		return await mailer.sendMail({
			from: emailConfiguration.owner+" <"+emailConfiguration.mainAddress+">",
			to: settings.contactEmail,
			subject: settings.siteName+" - Contact Form",
			text: 	"Nombre: "+params.name+"\n"+
					"Email: "+params.email+"\n"+
					"Teléfono: "+params.phone+"\n"+
					"Mensaje: "+params.message+"\n"
			,
			html: 	"<p><b>Name: </b> "+params.name+"</p>"+
					"<p><b>Email: </b> "+params.email+"</p>"+
					"<p><b>Phone: </b> "+params.phone+"</p>"+
					"<p><b>Message: </b> "+params.message+"</p>"
		});

	}
}