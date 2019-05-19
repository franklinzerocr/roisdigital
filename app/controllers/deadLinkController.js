const mainController = require ("./mainController")

module.exports = {

	//*** PUBLIC METHODS ***//
	
	getPageContent: async function(lang,database){
		var deadLink={}

		// Get Layout
		deadLink.contents= await mainController.getContents(lang,database,"Dead Link")

		// const util = require('util');console.log(util.inspect(deadLink, false, null))

		return deadLink;
	}, 
	

}

