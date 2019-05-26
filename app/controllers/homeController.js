const interface = require ("../interface/interface")
const mainController = require ("./mainController")


//*** PRIVATE METHODS ***//


// Get the Services of the home. 'result.data' for the texts, descriptions and details. 'result.medias' for the medias to those contents
async function getServices(lang,database){
	let result={};
	try {
	    result.data= await database.query(
	        "SELECT s.id Service_Id, s.name_es Service_Name_es, s.name_en Service_Name_en, s.position Service_Position, s.description_es Service_Description_es, s.description_en Service_Description_en "+
	        "FROM services s "+ 
	        "ORDER BY Service_Position"
	    );

	    result.data= interface.setDefaultLangValues(lang,result.data)

	    result.medias= await database.query(
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, ms.position MediaService_Position, s.id Service_Id "+ 
	        "FROM services s, multimedias m, medias_services ms "+
	        "WHERE ms.fk_service=s.id AND ms.fk_media=m.id "+
	        "ORDER BY Service_Id, MediaService_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)
	    dataAux= await interface.setChildrenToData(result.data,result.medias,"Service_Id","Medias")
		if (dataAux) result.data=dataAux


	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}

// Get the Portfolio of the home. 'result.data' for the texts, descriptions and details. 'result.media' for the medias to those contents
async function getPortfolios(lang,database){
	let result={};
	try {
	    result.data= await database.query(
	        "SELECT p.id Portfolio_Id, p.name_es Portfolio_Name_es, p.name_en Portfolio_Name_en, p.position Portfolio_Position, p.description_es Portfolio_Description_es, p.description_en Portfolio_Description_en, p.link Portfolio_Link, p.title Portfolio_Title "+
	        "FROM portfolio p "+
	        "ORDER BY Portfolio_Position"
	    );

	    result.data= interface.setDefaultLangValues(lang,result.data)

	    result.categories= await database.query(
	        "SELECT c.id Category_Id, c.name_es Category_Name_es, c.name_en Category_Name_en, p.id Portfolio_Id "+
	        "FROM portfolio p, categories c, category_portfolio cp "+
	        "WHERE cp.fk_portfolio=p.id AND cp.fk_category=c.id "+
	        "ORDER BY Portfolio_Id"
	    ); 

	    result.categories= interface.setDefaultLangValues(lang,result.categories)
	    dataAux= await interface.setChildrenToData(result.data,result.categories,"Portfolio_Id","Categories")
	    if (dataAux) result.data=dataAux

	    result.medias= await database.query(
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mp.position MediaPortfolio_Position, p.id Portfolio_Id "+
	        "FROM portfolio p, multimedias m, medias_portfolio mp "+
	        "WHERE mp.fk_portfolio=p.id AND mp.fk_media=m.id "+
	        "ORDER BY Portfolio_Id, MediaPortfolio_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)
	    dataAux= await interface.setChildrenToData(result.data,result.medias,"Portfolio_Id","Medias")
	    if (dataAux) result.data=dataAux

	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}

// Get the Team of the home. 'result.data' for the texts, descriptions and details. 'result.media' for the medias to those contents
async function getTeamMembers(lang,database){
	let result={};
	try {
	     result.data= await database.query(
	        "SELECT tm.id TeamMember_Id, tm.name TeamMember_Name, tm.positionname_es TeamMember_PositionName_es, tm.positionname_en TeamMember_PositionName_en, tm.description_es TeamMember_Description_es, tm.description_en TeamMember_Description_en, tm.facebook TeamMember_Facebook, tm.instagram TeamMember_Instagram, tm.twitter TeamMember_Twitter, tm.github TeamMember_Github, tm.behance TeamMember_Behance, tm.website TeamMember_Website, tm.email TeamMember_Email, tm.position TeamMember_Position "+
	        "FROM teammembers tm "+
	        "ORDER BY TeamMember_Position"
	    );

	    result.data= interface.setDefaultLangValues(lang,result.data)

	    result.medias= await database.query(
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name,  m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mt.position MediaTeam_Position, tm.id TeamMember_Id "+
	        "FROM teammembers tm, multimedias m, medias_team mt "+
	        "WHERE mt.fk_team=tm.id AND mt.fk_media=m.id "+
	        "ORDER BY TeamMember_Id, MediaTeam_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)
	    dataAux= await interface.setChildrenToData(result.data,result.medias,"TeamMember_Id","Medias")
	    if (dataAux) result.data=dataAux

	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}


module.exports = {

	//*** PUBLIC METHODS ***//

	getLayout: async function(lang,database){
		var layout={}

		layout.header= await mainController.getHeader(lang,database)
		layout.footer= await mainController.getFooter(lang,database)
		layout.menuSections= await mainController.getMenuSections(lang,database)
		layout.post = await mainController.getPost(lang,database,1)

		// const util = require('util');console.log(util.inspect(layout, false, null));

		return layout
	},
	

	getPageContent: async function(lang,database){
		var home={}

		home.contents= await mainController.getContents(lang,database,"Home")
		home.services= await getServices(lang,database)
		home.portfolios= await getPortfolios(lang,database)
		home.teamMembers= await getTeamMembers(lang,database)

		// const util = require('util');console.log(util.inspect(home, false, null));

		return home
	}, 
	

}

