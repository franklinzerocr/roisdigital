
module.exports = {

	sendContactMail: async function(mailer,emailConfiguration,settings,params){ 

		// Send Email
		return await mailer.sendMail({
			from: emailConfiguration.owner+" <"+emailConfiguration.mainAddress+">",
			to: settings.contactEmail,
			subject: settings.siteName+" - Contact Form",
			text: 	"Nombre: "+params.eman+"\n"+
					"Email: "+params.liame+"\n"+
					"Teléfono: "+params.enohp+"\n"+
					"Mensaje: "+params.egassem+"\n"
			,
			html: 	"<p><b>Name: </b> "+params.eman+"</p>"+
					"<p><b>Email: </b> "+params.liame+"</p>"+
					"<p><b>Phone: </b> "+params.enohp+"</p>"+
					"<p><b>Message: </b> "+params.egassem+"</p>"
		});

	}
}