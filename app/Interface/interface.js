module.exports = {

	// Get Current Date in a cute string
	getDateStringCustom: function(){
	    var oDate = new Date();
	    var sDate;
	    sDate = oDate.getYear() + 1900
	        + '/'
	        + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
	        + '/' + oDate.getDate()
	        + ' - ' + oDate.getHours()
	        + ':' + ((oDate.getMinutes() < 10) ? '0' + (oDate.getMinutes()) : oDate.getMinutes())
	        + ':' + ((oDate.getSeconds() < 10) ? '0' + (oDate.getSeconds()) : oDate.getSeconds());
	    return sDate;
	},

	// Get the keys of an object and return an array with the keys that match the Default Lang
	removeNotDefaultLangKeys: function(lang,keys){
		var auxKeys=[];

		keys.forEach(function(key,i){
			if (key.includes("_"+lang)) auxKeys.push(key)
		})

		return auxKeys
	},

	// Creates new fields in the row of the query, for storing the Default Lang Information
	setDefaultLangValues: function (lang,rows){
		if (rows==null || !Object.keys(rows).length) return null;

		var keys = this.removeNotDefaultLangKeys(lang,Object.keys(rows[0]))

		rows.forEach(function(row,i){
			keys.forEach(function(key,i2){
				defaultKey=key.split("_"+lang)[0]
				row[defaultKey]=row[key]
			}); 

			this[i]=row;
		},rows);

		return rows;
	},

	// Joins the medias corresponding to each row in the data retrieved from the query
	setMediasToData: async function(rows,medias,primaryKey){
		if (rows==null || !Object.keys(rows).length) return null;
		
		await Promise.all(rows.map(async (row) => {
	   		let i = rows.indexOf(row)
   			rows[i].Medias=[]
	    	await Promise.all(medias.map(async (media) => {
	    		if (media[primaryKey]==row[primaryKey])
	    			rows[i].Medias.push(media)
	    	}))
	   	}))
	   	return rows;
	}

}