const mainController = require ("./mainController")

module.exports = {

	//*** PUBLIC METHODS ***//


	getLayout: async function(lang,database){
		var layout={}

		layout.header= await mainController.getHeader(lang,database)
		layout.footer= await mainController.getFooter(lang,database)
		layout.menuSections= await mainController.getMenuSections(lang,database)
		layout.post = await mainController.getPost(lang,database,2)

		// const util = require('util');console.log(util.inspect(layout, false, null));

		return layout
	},
	
	getPageContent: async function(lang,database){
		var comingSoon={}

		// Get Layout
		comingSoon.contents= await mainController.getContents(lang,database,"Coming Soon")

		// const util = require('util');console.log(util.inspect(comingSoon, false, null))

		return comingSoon;
	}, 
	

}

