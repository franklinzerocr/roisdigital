const interface = require ("../interface/interface")
const mainController = require ("./mainController")

module.exports = {

	//*** PUBLIC METHODS ***//
	
	getPageContent: async function(lang,database){
		var comingSoon={}

		// Get Layout
		comingSoon.contents= await mainController.getContents(lang,database,"Coming Soon")

		// const util = require('util');console.log(util.inspect(comingSoon, false, null))

		return comingSoon;
	}, 
	

}

