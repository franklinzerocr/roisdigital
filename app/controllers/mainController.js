const interface = require ("../interface/interface")

module.exports = {

	//*** PUBLIC METHODS ***//

	// Get the HEADER content. 'result.data' for the texts, descriptions and details. 'result.medias' for the medias to those content
	getHeader: async function(lang,database){
		let result={};
		try {
		    result.data= await database.query(
		        "SELECT sc.id StaticContent_Id, sc.name_es StaticContent_Name_es, sc.name_en StaticContent_Name_en, sc.position StaticContent_Position "+
		        "FROM staticcontent sc, sections s "+ 
		        "WHERE sc.fk_section=s.id AND s.name_en='Header' "+
		        "ORDER BY StaticContent_Position"
		    )

		    result.data= interface.setDefaultLangValues(lang,result.data)


		    result.medias= await database.query(
		        "SELECT m.id Multimedia_Id, m.name Multimedia_Name,  m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mc.position MediaContent_Position, sc.id StaticContent_Id "+ 
		        "FROM staticcontent sc, sections s, multimedias m, medias_content mc "+ 
		        "WHERE sc.fk_section=s.id AND s.name_en='Header' AND mc.fk_content=sc.id AND mc.fk_media=m.id "+
 		        "ORDER BY StaticContent_Id, MediaContent_Position"
		    )

		    result.medias= interface.setDefaultLangValues(lang,result.medias)
		    dataAux= await interface.setChildrenToData(result.data,result.medias,"StaticContent_Id","Medias") 
		    if (dataAux) result.data=dataAux


		    result.descriptions= await database.query(
		        "SELECT sc_d.id ContentDescription_Id, sc_d.description_es ContentDescription_Description_es, sc_d.description_en ContentDescription_Description_en, sc_d.position ContentDescription_Position, sc.id StaticContent_Id "+
		        "FROM staticcontent sc, sections s, staticcontent_descriptions sc_d "+ 
		        "WHERE sc.fk_section=s.id AND s.name_en='Header' AND sc_d.fk_content=sc.id "+
		        "ORDER BY StaticContent_Id, ContentDescription_Position"
		    )

		    result.descriptions= interface.setDefaultLangValues(lang,result.descriptions)
		    dataAux= await interface.setChildrenToData(result.data,result.descriptions,"StaticContent_Id","Descriptions")
		    if (dataAux) result.data=dataAux


		} catch (error) {
		    console.log(error);
		    result={};
		}
		return result;
	},

	// Get the FOOTER content. 'result.data' for the texts, descriptions and details. 'result.medias' for the medias to those content
	getFooter: async function(lang,database){
		let result={};
		try {
		    result.data= await database.query(
		        "SELECT sc.id StaticContent_Id, sc.name_es StaticContent_Name_es, sc.name_en StaticContent_Name_en, sc.position StaticContent_Position, s.id Section_Id, s.name_es Section_Name_es, s.name_en Section_Name_en "+
		        "FROM staticcontent sc, sections s "+ 
		        "WHERE sc.fk_section=s.id AND s.name_en='Footer' "+
		        "ORDER BY StaticContent_Position"
		    );

		    result.data= interface.setDefaultLangValues(lang,result.data)

		    result.medias= await database.query(
		        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mc.position MediaContent_Position, sc.id StaticContent_Id "+ 
		        "FROM staticcontent sc, sections s, multimedias m, medias_content mc "+ 
		        "WHERE sc.fk_section=s.id AND s.name_en='Footer' AND mc.fk_content=sc.id AND mc.fk_media=m.id "+
		        "ORDER BY StaticContent_Id, MediaContent_Position"
		    );

		    result.medias= interface.setDefaultLangValues(lang,result.medias)
		    dataAux= await interface.setChildrenToData(result.data,result.medias,"StaticContent_Id","Medias") 
		    if (dataAux) result.data=dataAux

		    result.descriptions= await database.query(
		        "SELECT sc_d.id ContentDescription_Id, sc_d.description_es ContentDescription_Description_es, sc_d.description_en ContentDescription_Description_en, sc_d.position ContentDescription_Position, sc.id StaticContent_Id "+
		        "FROM staticcontent sc, sections s, staticcontent_descriptions sc_d "+ 
		        "WHERE sc.fk_section=s.id AND s.name_en='Footer' AND sc_d.fk_content=sc.id "+
		        "ORDER BY StaticContent_Id, ContentDescription_Position"
		    )

		    result.descriptions= interface.setDefaultLangValues(lang,result.descriptions)
		    dataAux= await interface.setChildrenToData(result.data,result.descriptions,"StaticContent_Id","Descriptions")
		    if (dataAux) result.data=dataAux



		} catch (error) {
		    console.log(error);
		    result={};
		}
		return result;
	},

	// Get the Menu Items that are Enabled
	getMenuSections: async function(lang,database){
		let result={};
		try {
		     result.data= await database.query(
		        "SELECT s.id Section_Id, s.name_es Section_Name_es, s.name_en Section_Name_en, s.menu Section_Menu, s2.id ParentSection_Id, s2.name_es ParentSection_Name_es, s2.name_en ParentSection_Name_en "+
		        "FROM sections s, sections s2 "+
		        "WHERE s.fk_section=s2.id AND s.menu>0 AND s.enabled=1 "+
		        "ORDER BY Section_Menu"
		    );

		    result.data= interface.setDefaultLangValues(lang,result.data)


		} catch (error) {
		    console.log(error);
		    result={};
		}
		return result;
	},


	// Get the Static Content of the Page. 'result.data' for the texts, descriptions and details. 'result.medias' for the medias to those contents
	getContents: async function(lang,database,page){
		let result={};
		try {
		    result.data= await database.query(
		        "SELECT sc.id StaticContent_Id, sc.name_es StaticContent_Name_es, sc.name_en StaticContent_Name_en, sc.position StaticContent_Position, s.id Section_Id, s.name_es Section_Name_es, s.name_en Section_Name_en "+
		        "FROM staticcontent sc, sections s, sections s2 "+ 
		        "WHERE sc.fk_section=s.id AND s.fk_section=s2.id AND s2.name_en=? AND s.enabled=1 "+
		        "ORDER BY Section_Id,StaticContent_Position"
		    , [page]);

		    result.data= interface.setDefaultLangValues(lang,result.data)

		    result.medias= await database.query(
		        "SELECT m.id Multimedia_Id, m.name Multimedia_Name, m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mc.position MediaContent_Position, sc.id StaticContent_Id "+ 
		        "FROM staticcontent sc, sections s, sections s2, multimedias m, medias_content mc "+ 
		        "WHERE sc.fk_section=s.id AND s.fk_section=s2.id AND s2.name_en=? AND mc.fk_content=sc.id AND mc.fk_media=m.id AND s.enabled=1 "+
		        "ORDER BY StaticContent_Id, MediaContent_Position"
		    , [page]);

		    result.medias= interface.setDefaultLangValues(lang,result.medias)
		    dataAux= await interface.setChildrenToData(result.data,result.medias,"StaticContent_Id","Medias") 
		    if (dataAux) result.data=dataAux

		    result.descriptions= await database.query(
		        "SELECT sc_d.id ContentDescription_Id, sc_d.name ContentDescription_Name, sc_d.description_es ContentDescription_Description_es, sc_d.description_en ContentDescription_Description_en, sc_d.position ContentDescription_Position, sc.id StaticContent_Id "+
		        "FROM staticcontent sc, sections s, sections s2, staticcontent_descriptions sc_d "+ 
		        "WHERE sc.fk_section=s.id AND s.fk_section=s2.id AND s2.name_en=?  AND sc_d.fk_content=sc.id AND s.enabled=1 "+
		        "ORDER BY StaticContent_Id, ContentDescription_Position"
		    , [page])

		    result.descriptions= interface.setDefaultLangValues(lang,result.descriptions)
		    dataAux= await interface.setChildrenToData(result.data,result.descriptions,"StaticContent_Id","Descriptions")
		    if (dataAux) result.data=dataAux



		} catch (error) {
		    console.log(error);
		    result={};
		}
		return result;
	},


	// Get the POST content. 'result.data' for the texts, descriptions and details. 'result.medias' for the medias to those POST
	getPost: async function(lang,database,post){
		let result={};
		try {
		    result.data= await database.query(
		        "SELECT p.id Post_Id, p.title_es Post_Title_es, p.title_en Post_Title_en, p.content_es Post_Content_es, p.content_en Post_Content_en, p.description_es Post_Description_es, p.description_en Post_Description_en, p.url_es Post_URL_es, p.url_en Post_URL_en, p.type Post_Type, p.card Post_Card, s.name_es Section_Name_es, s.name_en Section_Name_en "+
		        "FROM posts p, sections s "+ 
		        "WHERE p.id=? AND p.fk_section=s.id "
		    ,[post])

		    result.data= interface.setDefaultLangValues(lang,result.data)


		    result.medias= await database.query(
		        "SELECT m.id Multimedia_Id, m.name Multimedia_Name,  m.description_es Multimedia_Description_es, m.description_en Multimedia_Description_en, m.path_es Multimedia_Path_es, m.path_en Multimedia_Path_en, mp.position MediaPost_Position, p.id Post_Id "+
		        "FROM posts p, multimedias m, medias_post mp "+ 
		        "WHERE p.id=? AND mp.fk_post=p.id AND mp.fk_media=m.id "+
 		        "ORDER BY MediaPost_Position"
		    ,[post])

		    result.medias= interface.setDefaultLangValues(lang,result.medias)
		    dataAux= await interface.setChildrenToData(result.data,result.medias,"Post_Id","Medias") 
		    if (dataAux) result.data=dataAux 

		} catch (error) {
		    console.log(error);
		    result={};
		}
		return result;
	},



}