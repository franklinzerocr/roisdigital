const config = require("config")

module.exports = (router) => {
	if (config.devMode)
    	require('./comingSoonRouter')(router)
    else 
    	require('./homeRouter')(router)  
    
    require('./contactFormRouter')(router)
    require('./multiLangRouter')(router)
    require('./deadLinkRouter')(router)
}