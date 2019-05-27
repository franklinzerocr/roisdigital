const mainController = require ("./mainController")

module.exports = {

	//*** PUBLIC METHODS ***//

	getLayout: async function(lang,database){
		var layout={}

		layout.header= await mainController.getHeader(lang,database)
		layout.footer= await mainController.getFooter(lang,database)
		layout.menuSections= await mainController.getMenuSections(lang,database)
		layout.post = await mainController.getPost(lang,database,3)
		// const util = require('util');console.log(util.inspect(layout, false, null));

		return layout
	},

	
	getPageContent: async function(lang,database){
		var deadLink={}

		// Get Layout
		deadLink.contents= await mainController.getContents(lang,database,"Dead Link")

		// const util = require('util');console.log(util.inspect(deadLink, false, null))

		return deadLink;
	}, 
	

}

