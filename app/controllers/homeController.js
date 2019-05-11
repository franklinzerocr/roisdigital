const interface = require ("../interface/interface.js")
// const util = require('util');
// console.log(util.inspect(result.data, false, null));

//*** PRIVATE METHODS ***//

// Get the Static Content of the home. 'result.data' for the texts, descriptions and details. 'result.medias' for the medias to those contents
async function getStaticContent(lang,database){
	let result={};
	try {
	    result.data= await database.query(
	        "SELECT sc.id StaticContent_Id, sc.name_es StaticContent_Name_es, sc.name_en StaticContent_Name_en, sc.type StaticContent_Type, sc.position StaticContent_Position, sc.description_es StaticContent_Description_es, sc.description_en StaticContent_Description_en, s.id Section_Id, s.name_es Section_Name_es, s.name_en Section_Name_en "+
	        "FROM staticcontent sc, sections s, sections s2 "+ 
	        "WHERE sc.fk_section=s.id AND s.fk_section=s2.id AND s2.name_en='Home' "+
	        "ORDER BY Section_Id,StaticContent_Position"
	    );

	    result.data= interface.setDefaultLangValues(lang,result.data)


	    result.medias= await database.query(
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.type Multimedia_type, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mc.position MediaContent_Position, sc.id StaticContent_Id "+ 
	        "FROM staticcontent sc, sections s, sections s2, multimedias m, medias_content mc "+ 
	        "WHERE sc.fk_section=s.id AND s.fk_section=s2.id AND s2.name_en='Home' AND mc.fk_content=sc.id AND mc.fk_media=m.id "+
	        "ORDER BY StaticContent_Id, MediaContent_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)

	    result.data= await interface.setMediasToData(result.data,result.medias,"StaticContent_Id") 


	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}

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
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.type Multimedia_type, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, ms.position MediaService_Position, s.id Service_Id "+ 
	        "FROM services s, multimedias m, medias_services ms "+
	        "WHERE ms.fk_service=s.id AND ms.fk_media=m.id "+
	        "ORDER BY Service_Id, MediaService_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)

	    result.data= await interface.setMediasToData(result.data,result.medias,"Service_Id")

	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}

// Get the Portfolio of the home. 'result.data' for the texts, descriptions and details. 'result.media' for the medias to those contents
async function getPortfolio(lang,database){
	let result={};
	try {
	    result.data= await database.query(
	        "SELECT p.id Portfolio_Id, p.name_es Portfolio_Name_es, p.name_en Portfolio_Name_en, p.position Portfolio_Position, p.description_es Portfolio_Description_es, p.description_en Portfolio_Description_en "+
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

	    result.media= await database.query(
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.type Multimedia_type, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mp.position MediaPortfolio_Position, p.id Portfolio_Id "+
	        "FROM portfolio p, multimedias m, medias_portfolio mp "+
	        "WHERE mp.fk_portfolio=p.id AND mp.fk_media=m.id "+
	        "ORDER BY Portfolio_Id, MediaPortfolio_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)

	    result.data= await interface.setMediasToData(result.data,result.medias,"Portfolio_Id")

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
	        "SELECT tm.id TeamMember_Id, tm.name TeamMember_Name, tm.positionname_es TeamMember_PositionName_es, tm.positionname_en TeamMember_PositionName_en, tm.description_es TeamMember_Description_es, tm.description_en TeamMember_Description_en, tm.facebook TeamMember_Facebook, tm.instagram TeamMember_Instagram, tm.twitter TeamMember_Twitter, tm.website TeamMember_Website, tm.email TeamMember_Email, tm.position TeamMember_Position "+
	        "FROM teammembers tm "+
	        "ORDER BY TeamMember_Position"
	    );

	    result.data= interface.setDefaultLangValues(lang,result.data)

	    result.media= await database.query(
	        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.type Multimedia_type, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mt.position MediaTeam_Position, tm.id TeamMember_Id "+
	        "FROM teammembers tm, multimedias m, medias_team mt "+
	        "WHERE mt.fk_team=tm.id AND mt.fk_media=m.id "+
	        "ORDER BY TeamMember_Id, MediaTeam_Position"
	    );

	    result.medias= interface.setDefaultLangValues(lang,result.medias)

	    result.data= await interface.setMediasToData(result.data,result.medias,"TeamMember_Id")

	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}

// Get the Sections. 'result.data' for the texts, descriptions and details.
async function getSections(lang,database){
	let result={};
	try {
	     result.data= await database.query(
	        "SELECT s.id Section_Id, s.name_es Section_Name_es, s.name_en Section_Name_en, s2.id ParentSection_Id, s2.name_es ParentSection_Name_es, s2.name_en ParentSection_Name_en "+
	        "FROM sections s, sections s2 "+
	        "WHERE s.fk_section=s2.id "+
	        "ORDER BY ParentSection_Id, Section_Id"
	    );

	    result.data= interface.setDefaultLangValues(lang,result.data)


	} catch (error) {
	    console.log(error);
	    result={};
	}
	return result;
}




module.exports = {

	//*** PUBLIC METHODS ***//
	
	getFullHome: async function(lang,database){
		var home={}
		
		home.statics= await getStaticContent(lang,database)
		home.services= await getServices(lang,database)
		home.portfolios= await getPortfolio(lang,database)
		home.teammembers= await getTeamMembers(lang,database)
		home.sections= await getSections(lang,database)

		return home;
	}, 
	

}
