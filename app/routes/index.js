const config = require("config")


module.exports = (router) => {
	if (config.devMode)
    	require('./comingSoonRouter')(router)
    else 
    	require('./homeRouter')(router)  
    require('./deadLinkRouter')(router)
} 